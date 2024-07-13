'use client'

import React, { ElementRef, useRef, useState } from 'react'
import ListWrapper from './list-wrapper'
import { DiamondPlus, Plus, X } from 'lucide-react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { FormInput } from '@/components/form/form-input'
import { useParams, useRouter } from 'next/navigation'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'
import { useToast } from '@/components/ui/use-toast'

const ListForm = () => {
  const params = useParams()
  const router = useRouter()

  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast({
        title: `List "${data.title}" created`,
        variant: 'success',
      })
      disableEditing()
      router.refresh()
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({ title, boardId })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form action={onSubmit} ref={formRef} className='w-full p-3 rounded-md bg-accent space-y-3 shadow-md'>
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id='title'
            className='text-sm px-2 py-1 h-9 font-medium border-transparent hover:border-input focus:border-input transition'
            placeholder='Enter list title...'
          />
          <input hidden readOnly value={params.boardId} name='boardId' />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>
              <DiamondPlus />
              Add list
            </FormSubmit>
            <Button onClick={disableEditing} size={'icon'} variant={'outline-destructive'}>
              <X />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'
      >
        <Plus className='h-4 w-4 mr-2' />
        Add a list
      </button>
    </ListWrapper>
  )
}

export default ListForm
