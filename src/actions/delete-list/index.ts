'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { DeleteListSchema, InputType, ReturnType } from './schema'
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

  let list

  try {
    list = await prisma.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    })

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: 'Failed to delete list',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const deleteList = createSafeAction(DeleteListSchema, handler)
