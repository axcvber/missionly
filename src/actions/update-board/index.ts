'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { InputType, ReturnType, UpdateBoardSchema } from './schema'
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

  const { title, id } = data

  let board

  try {
    board = await prisma.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    })

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    })
  } catch (error) {
    return {
      error: 'Failed to update board',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoardSchema, handler)
