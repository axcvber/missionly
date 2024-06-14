import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
import { ENTITY_TYPE } from '@prisma/client'

export async function GET(req: Request, { params }: { params: { cardId: string } }) {
  try {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const auditLogs = await prisma.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    })

    return NextResponse.json(auditLogs)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
