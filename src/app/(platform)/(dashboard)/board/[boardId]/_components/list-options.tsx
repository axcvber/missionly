'use client'

import { List } from '@prisma/client'
import React, { ElementRef, useRef } from 'react'

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, X } from 'lucide-react'
import { FormSubmit } from '@/components/form/form-submit'
import { Separator } from '@/components/ui/separator'
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
      <PopoverContent className='px-0 py-3 w-60' side='bottom' align='end' sideOffset={20}>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>List actions</div>
        <PopoverClose ref={closeRef} asChild>
          <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant={'ghost'}>
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          variant={'ghost'}
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant={'ghost'}
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant={'ghost'}
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default ListOptions
