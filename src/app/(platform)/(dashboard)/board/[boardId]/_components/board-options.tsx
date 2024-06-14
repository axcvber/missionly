'use client'

import React from 'react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, X } from 'lucide-react'
import { useAction } from '@/hooks/use-action'
import { deleteBoard } from '@/actions/delete-board'
import { useToast } from '@/components/ui/use-toast'

interface BoardOptionsProps {
  id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { toast } = useToast()
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  const onDelete = () => {
    execute({ id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant={'transparent'}>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 py-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>Board Actions</div>
        <PopoverClose asChild>
          <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant={'ghost'}>
            <X className='w-4 h-4' />
          </Button>
        </PopoverClose>
        <Button
          variant={'ghost'}
          disabled={isLoading}
          onClick={onDelete}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default BoardOptions
