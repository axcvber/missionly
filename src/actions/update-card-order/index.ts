'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { UpdateCardOrderSchema, InputType, ReturnType } from './schema'
import { auth } from '@clerk/nextjs/server'
import { createSafeAction } from '@/lib/create-safe-action'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { items, boardId } = data

  let updatedCards

  try {
    const transaction = items.map((card) =>
      prisma.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    )

    updatedCards = await prisma.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to reorder card',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrderSchema, handler)
