'use client'

import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'
import { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'
import React from 'react'

interface ActivityProps {
  data: AuditLog[]
}

export const Activity = ({ data }: ActivityProps) => {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <ActivityIcon className='h-5 w-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-700 mb-2'>Activity</p>
        <ol className='mt-2 space-y-4'>
          {data.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  )
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className='flex items-center gap-x-3 w-full'>
      <Skeleton className='bg-neutral-200 h-6 w-6' />
      <div className='w-full'>
        <Skeleton className='bg-neutral-200 h-6 w-24 mb-2' />
        <Skeleton className='bg-neutral-200 h-10 w-full' />
      </div>
    </div>
  )
}
