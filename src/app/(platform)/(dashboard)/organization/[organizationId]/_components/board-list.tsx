'use client'

import FormPopover from '@/components/form/form-popover'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import { useOrganizationStore } from '@/hooks/use-organization-store'
import { useOrganizationList } from '@clerk/nextjs'
import { Board } from '@prisma/client'
import { HelpCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BoardListProps {
  data: Board[]
  availableCount: number
  isPro: boolean
}

export const BoardList = ({ data, availableCount, isPro }: BoardListProps) => {
  const { isLoaded } = useOrganizationList()
  const { isSwitching } = useOrganizationStore()

  if (!isLoaded || isSwitching) {
    return <BoardList.Skeleton />
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-muted rounded-sm h-full w-full overflow-hidden'
          >
            <Image priority fill src={board.imageThumbUrl} alt={board.imageUserName} className='object-cover' />
            <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition p-3'>
              <p className='font-semibold text-white'>{board.title}</p>
            </div>
          </Link>
        ))}
        <FormPopover sideOffset={10} side='right' align='start'>
          <div
            role='button'
            className='aspect-video border relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-xs text-neutral-400'>
              {isPro ? 'Unlimited' : `${MAX_FREE_BOARDS - availableCount} remaining`}
            </span>
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
