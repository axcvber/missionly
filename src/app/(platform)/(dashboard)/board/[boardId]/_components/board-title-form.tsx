'use client'

import React, { ElementRef, useRef, useState } from 'react'
import { updateBoard } from '@/actions/update-board'
import { FormInput } from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { Board } from '@prisma/client'

interface BoardTitleFormProps {
  data: Board
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { toast } = useToast()
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast({
        title: `Board "${data.title}" updated!`,
        variant: 'success',
      })
      setTitle(data.title)
      disableEditing()
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

  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    if (title !== data.title) {
      execute({ title, id: data.id })
    }
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className='flex items-center gap-x-2'>
        <FormInput
          ref={inputRef}
          id='title'
          onBlur={onBlur}
          defaultValue={title}
          className='text-lg font-medium px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
        />
      </form>
    )
  }

  return (
    <Button onClick={enableEditing} variant={'transparent'} className='font-medium text-lg h-auto w-auto p-1 px-2'>
      {title}
    </Button>
  )
}

export default BoardTitleForm
