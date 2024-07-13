'use client'

import { updateCard } from '@/actions/update-card'
import { FormInput } from '@/components/form/form-input'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { Layout } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ElementRef, useRef, useState } from 'react'

interface HeaderProps {
  data: CardWithList
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient()
  const params = useParams()
  const { toast } = useToast()
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [title, setTitle] = useState(data?.title)

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      })
      toast({
        title: `Renamed to "${data.title}"`,
        variant: 'success',
      })
      setTitle(data.title)
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = params.boardId as string

    if (title === data.title) {
      return
    }

    execute({
      title,
      boardId,
      id: data.id,
    })
  }

  return (
    <div className='flex items-start gap-x-3 mb-6 w-full'>
      <Layout className='h-5 w-5 mt-2 text-neutral-700' />
      <div className='w-full '>
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id={'title'}
            defaultValue={title}
            className='font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate'
          />
        </form>
        <p className='text-sm text-muted-foreground'>
          in list <span className='underline'>{data.list.title}</span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className='flex items-start gap-x-3 mb-6 w-full'>
      <Skeleton className='w-6 h-6 bg-neutral-200 rounded-sm' />
      <div>
        <Skeleton className='w-36 h-8 mb-2 bg-neutral-200 rounded-sm' />
        <Skeleton className='w-24 h-5 bg-neutral-200 rounded-sm' />
      </div>
    </div>
  )
}
