'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useOrganizationStore } from '@/hooks/use-organization-store'
import { useOrganization } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface InfoProps {
  isPro: boolean
}

export const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization()
  const { isSwitching } = useOrganizationStore()

  if (!isLoaded || isSwitching) {
    return <Info.Skeleton />
  }

  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Image fill src={organization?.imageUrl!} alt='Organization' className='rounded-md object-cover' />
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-xl'>{organization?.name}</p>
        <div className='flex items-center text-xs text-muted-foreground'>
          <CreditCard className='w-3 h-3 mr-1' />
          {isPro ? 'Pro' : 'Free'}
        </div>
      </div>
    </div>
  )
}

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Skeleton className='w-full h-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='w-[200px] h-6 rounded-sm' />
        <div className='flex items-center'>
          <Skeleton className='w-4 h-4 mr-1 rounded-sm' />
          <Skeleton className='w-[100px] h-4 rounded-sm' />
        </div>
      </div>
    </div>
  )
}
