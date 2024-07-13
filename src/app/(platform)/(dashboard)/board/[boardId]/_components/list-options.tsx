'use client'

import { List } from '@prisma/client'
import React, { ElementRef, useRef } from 'react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CopyPlus, DiamondPlus, MoreHorizontal, Trash2, X } from 'lucide-react'
import { FormSubmit } from '@/components/form/form-submit'
import { useAction } from '@/hooks/use-action'
import { deleteList } from '@/actions/delete-list'
import { useToast } from '@/components/ui/use-toast'
import { copyList } from '@/actions/copy-list'

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const { toast } = useToast()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast({
        title: `List "${data.title}" deleted`,
        variant: 'success',
      })
      closeRef.current?.click()
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast({
        title: `List "${data.title}" copied`,
        variant: 'success',
      })
      closeRef.current?.click()
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeCopy({ id, boardId })
  }

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeDelete({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant={'ghost'}>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-60' side='bottom' align='end'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm font-medium text-neutral-600'>List Actions</p>
          <PopoverClose asChild>
            <Button variant={'ghost'} size={'icon-xs'}>
              <X />
            </Button>
          </PopoverClose>
        </div>

        <div className='space-y-2'>
          <Button size={'sm'} onClick={onAddCard} className='w-full'>
            <DiamondPlus />
            Add card
          </Button>

          <form action={onCopy}>
            <input hidden name='id' id='id' value={data.id} />
            <input hidden name='boardId' id='boardId' value={data.boardId} />
            <FormSubmit variant={'outline-primary'} className='w-full'>
              <CopyPlus />
              Copy list
            </FormSubmit>
          </form>

          <form action={onDelete}>
            <input hidden name='id' id='id' value={data.id} />
            <input hidden name='boardId' id='boardId' value={data.boardId} />
            <FormSubmit variant={'outline-destructive'} className='w-full'>
              <Trash2 />
              Delete this list
            </FormSubmit>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ListOptions
