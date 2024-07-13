import React from 'react'
import { Info } from './_components/info'
import { Separator } from '@/components/ui/separator'
import { BoardList } from './_components/board-list'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import { getAvailableCount } from '@/lib/org-limit'
import { User2 } from 'lucide-react'

const OrganizationPage = async ({ params }: { params: { organizationId: string } }) => {
  const isPro = await checkSubscription()
  const availableCount = await getAvailableCount()
  const { orgId } = auth()

  if (!params.organizationId || !orgId) {
    return redirect('/select-org')
  }

  const boards = await prisma.board.findMany({
    where: { orgId: params.organizationId },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className='w-full'>
      <Info isPro={isPro} />
      <Separator className='my-6' />
      <div className='flex items-center font-semibold text-lg text-neutral-700 mb-4'>
        <User2 className='w-5 h-5 mr-2' />
        Your boards
      </div>
      <BoardList data={boards} availableCount={availableCount} isPro={isPro} />
    </div>
  )
}

export default OrganizationPage
