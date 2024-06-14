'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { CreateBoardSchema, InputType, ReturnType } from './schema'
import { auth } from '@clerk/nextjs/server'
import { createSafeAction } from '@/lib/create-safe-action'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { hasAvailableCount, incrementAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const canCreate = await hasAvailableCount()
  const isPro = await checkSubscription()

  if (!canCreate && !isPro) {
    return {
      error: 'You have reached your limit of free boards. Please upgrade to create more.',
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] = image.split('|')

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHtml || !imageUserName) {
    return {
      error: 'Missing field. Failed to create board',
    }
  }

  let board

  try {
    board = await prisma.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHtml,
        imageUserName,
      },
    })

    if (!isPro) {
      await incrementAvailableCount()
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'Failed to create board',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoardSchema, handler)
