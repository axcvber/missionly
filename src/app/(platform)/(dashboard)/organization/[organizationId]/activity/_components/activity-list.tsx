import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export const ActivityList = async () => {
  const { orgId } = auth()
  if (!orgId) {
    redirect('/select-org')
  }
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <ol className='space-y-4 mt-4'>
      <p className='hidden last:block text-xs text-center text-muted-foreground'>
        No activity found inside this organization
      </p>
      {auditLogs.map((item) => (
        <ActivityItem key={item.id} data={item} />
      ))}
    </ol>
  )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className='space-y-4 mt-4'>
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[50%] h-14' />
      <Skeleton className='w-[70%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[75%] h-14' />
    </ol>
  )
}
