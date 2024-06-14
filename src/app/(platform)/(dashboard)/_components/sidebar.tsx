'use client'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { NavItem } from './nav-item'

interface SidebarProps {
  storageKey?: string
}

const Sidebar: React.FC<SidebarProps> = ({ storageKey = 't-sidebar-state' }) => {
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
      <>
        <div className='flex items-center justify-between mb-2'>
          <Skeleton className='h-10 w-[50%]' />
          <Skeleton className='h-10 w-10' />
        </div>
        <div className='space-y-2'>
          {Array(12)
            .fill(0)
            .map((_, inx) => (
              <NavItem.Skeleton key={inx} />
            ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className='flex items-center mb-2'>
        <span className='pl-2 text-sm font-medium'>Workspaces</span>
        <Button asChild type='button' size={'icon'} variant={'ghost'} className='ml-auto w-8 h-8'>
          <Link href={'/select-org'}>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <Accordion type='multiple' defaultValue={defaultAccordionValue} className='space-y-2'>
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}

export default Sidebar
