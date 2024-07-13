'use client'

import React, { useState } from 'react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { DiamondPlus, X } from 'lucide-react'
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
  const proModalOpen = useProModal((state) => state.onOpen)
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { execute, fieldErrors, setFieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast({
        title: 'Board created!',
        variant: 'success',
      })
      setOpen(false)
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      console.error({ error })
      toast({
        title: error,
        variant: 'destructive',
      })
      if (error.startsWith('You have reached your limit')) {
        proModalOpen()
      }
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string

    execute({ title, image })
  }

  const handleToggle = () => {
    setOpen(!isOpen)
    setTimeout(() => {
      setFieldErrors(undefined)
    }, 300)
  }

  return (
    <Popover open={isOpen} onOpenChange={handleToggle}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} side={side} sideOffset={sideOffset} className='w-80 pt-3'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm font-medium text-neutral-600'>Create Board</p>
          <PopoverClose asChild>
            <Button className='' variant={'ghost'} size={'icon-xs'}>
              <X />
            </Button>
          </PopoverClose>
        </div>

        <form action={onSubmit} className='space-y-4'>
          <FormPicker id='image' errors={fieldErrors} />
          <FormInput id='title' label='Board title' type='text' errors={fieldErrors} />
          <FormSubmit className='w-full'>
            <DiamondPlus />
            Create Board
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FormPopover
