'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { CopyCardSchema, InputType, ReturnType } from './schema'
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

  const { id, boardId } = data

  let card

  try {
    const cardToCopy = await prisma.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    })

    if (!cardToCopy) {
      return { error: 'Card not found' }
    }

    const lastCard = await prisma.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await prisma.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId,
      },
    })

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'Failed to copy card',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const copyCard = createSafeAction(CopyCardSchema, handler)
