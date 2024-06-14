import FormPopover from '@/components/form/form-popover'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import prisma from '@/lib/db'
import { getAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs/server'
import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }

  const boards = await prisma.board.findMany({
    where: { orgId },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const availableCount = await getAvailableCount()
  const isPro = await checkSubscription()

  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='w-6 h-6 mr-2' />
        Your boards
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-muted rounded-sm h-full w-full overflow-hidden'
            style={{
              backgroundImage: `url(${board.imageThumbUrl})`,
            }}
          >
            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition p-2'>
              <p className='relative font-semibold text-white'>{board.title}</p>
            </div>
          </Link>
        ))}
        <FormPopover sideOffset={10} side='right'>
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-xs'>{isPro ? 'Unlimited' : `${MAX_FREE_BOARDS - availableCount} remaining`}</span>
            <Hint
              sideOffset={10}
              description='Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.'
            >
              <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      {Array(8)
        .fill(0)
        .map((_, inx) => (
          <Skeleton key={inx} className='aspect-video h-full w-full p-2' />
        ))}
    </div>
  )
}
