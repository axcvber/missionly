'use client'

import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { OrganizationResource } from '@clerk/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface NavItemProps {
  isActive: boolean
  isExpanded: boolean
  organization: OrganizationResource
  onExpand: (id: string) => void
}

export const NavItem = ({ isActive, isExpanded, onExpand, organization }: NavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    {
      label: 'Boards',
      icon: <Layout />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard />,
      href: `/organization/${organization.id}/billing`,
    },
  ]

  const onClick = (href: string) => {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Image fill src={organization.imageUrl} alt={'Organization'} className='rounded-sm object-cover' />
          </div>
          <span className='font-medium text-sm'>{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutral-700'>
        {routes.map((route) => (
          <Button
            key={route.href}
            size={'sm'}
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:mr-2',
              pathname === route.href && 'bg-sky500/10 text-sky-700'
            )}
            variant={'ghost'}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='w-10 h-10 relative shrink-0'>
        <Skeleton className='h-full w-full absolute' />
      </div>
      <Skeleton className='h-10 w-full' />
    </div>
  )
}
