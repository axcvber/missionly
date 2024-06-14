'use client'

import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { useCardModal } from '@/hooks/use-card-modal'
import { CardWithList } from '@/types'
import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

interface ActionsProps {
  data: CardWithList
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams()
  const { toast } = useToast()
  const onCloseModal = useCardModal((state) => state.onClose)
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
    onSuccess: (data) => {
      toast({
        title: `Card "${data.title}" copied`,
        variant: 'success',
      })
      onCloseModal()
    },

    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast({
        title: `Card "${data.title}" deleted`,
        variant: 'success',
      })
      onCloseModal()
    },

    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  const onCopy = () => {
    const boardId = params.boardId as string

    executeCopyCard({
      id: data.id,
      boardId,
    })
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    executeDeleteCard({
      id: data.id,
      boardId,
    })
  }

  return (
    <div className='space-y-2 mt-2'>
      <p className='text-xs font-semibold'>Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant={'gray'}
        size={'inline'}
        className='w-full justify-start'
      >
        <Copy className='h-4 w-4 mr-2' />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant={'gray'}
        size={'inline'}
        className='w-full justify-start'
      >
        <Trash className='h-4 w-4 mr-2' />
        Delete
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 mt-1 bg-neutral-200' />
      <Skeleton className='w-full h-8 mt-1 bg-neutral-200' />
      <Skeleton className='w-full h-8 mt-1 bg-neutral-200' />
    </div>
  )
}
