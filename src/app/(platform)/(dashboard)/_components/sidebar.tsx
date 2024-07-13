'use client'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { BadgePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Separator } from '@/components/ui/separator'
import { NavItem } from './nav-item'
import SubscriptionButton from '../organization/[organizationId]/billing/_components/subscription-button'
import { Skeleton } from '@/components/ui/skeleton'

interface SidebarProps {
  isPro: boolean
  storageKey?: string
}

const Sidebar: React.FC<SidebarProps> = ({ isPro, storageKey = 't-sidebar-state' }) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

  const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization()

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key)
    }
    return acc
  }, [])

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }))
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <div className='space-y-3'>
        <div className='space-y-2'>
          {Array(8)
            .fill(0)
            .map((_, inx) => (
              <NavItem.Skeleton key={inx} />
            ))}
        </div>

        <div className='flex items-center gap-x-2'>
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-6 ' />
        </div>
        <Skeleton className='h-10 w-full' />
      </div>
    )
  }

  return (
    <div className='space-y-2'>
      <Accordion type='multiple' defaultValue={defaultAccordionValue} className='space-y-2'>
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            organization={organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
      <Separator />
      <Button asChild variant={'ghost'} className='w-full justify-between p-2 pl-3 text-neutral-500'>
        <Link href={'/select-org'}>
          Add Workspace
          <BadgePlus />
        </Link>
      </Button>
      {!isPro && <SubscriptionButton isPro={isPro} className='w-full !mt-4' />}
    </div>
  )
}

export default Sidebar
