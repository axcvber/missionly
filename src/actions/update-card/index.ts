'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { InputType, ReturnType, UpdateCardSchema } from './schema'
import { auth } from '@clerk/nextjs/server'
import { createSafeAction } from '@/lib/create-safe-action'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id, boardId, ...values } = data

  let card

  try {
    card = await prisma.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    })

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    })
  } catch (error) {
    return {
      error: 'Failed to update card',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const updateCard = createSafeAction(UpdateCardSchema, handler)
