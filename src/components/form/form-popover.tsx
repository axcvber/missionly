'use client'

import React, { ElementRef, useRef } from 'react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'
import { useToast } from '../ui/use-toast'
import { FormPicker } from './form-picker'
import { useRouter } from 'next/navigation'
import { useProModal } from '@/hooks/use-pro-modal'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

const FormPopover = ({ children, align, side = 'bottom', sideOffset = 0 }: FormPopoverProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const proModalOpen = useProModal((state) => state.onOpen)
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast({
        title: 'Board created!',
        variant: 'success',
      })
      closeRef.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      console.error({ error })
      toast({
        title: error,
        variant: 'destructive',
      })
      // if( error: 'You have reached your limit of free boards. Please upgrade to create more.',)
      // todo: handle limit error & show modal
      proModalOpen()
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string

    execute({ title, image })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} side={side} sideOffset={sideOffset} className='w-80 pt-3'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>Create board</div>
        <PopoverClose ref={closeRef} asChild>
          <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant={'ghost'}>
            <X className='w-4 h-4' />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <FormPicker id='image' errors={fieldErrors} />
            <FormInput id='title' label='Board title' type='text' errors={fieldErrors} />
          </div>
          <FormSubmit className='w-full'>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FormPopover
