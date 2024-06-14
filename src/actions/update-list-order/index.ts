'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { UpdateListOrderSchema, InputType, ReturnType } from './schema'
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

  let lists

  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    )

    lists = await prisma.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to reorder list',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrderSchema, handler)
