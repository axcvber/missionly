'use client'

import React from 'react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash2, X } from 'lucide-react'
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
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-60' side='bottom' align='end' sideOffset={10}>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm font-medium text-neutral-600'>Board Actions</p>
          <PopoverClose asChild>
            <Button variant={'ghost'} size={'icon-xs'}>
              <X />
            </Button>
          </PopoverClose>
        </div>

        <Button size={'sm'} variant={'outline-destructive'} disabled={isLoading} onClick={onDelete} className='w-full'>
          <Trash2 />
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default BoardOptions
