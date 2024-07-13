'use client'

import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { OrganizationResource } from '@clerk/types'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface NavItemProps {
  isActive: boolean
  organization: OrganizationResource
  onExpand: (id: string) => void
}

export const NavItem = ({ isActive, onExpand, organization }: NavItemProps) => {
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
          'flex items-center gap-x-2 p-1.5 text-primary rounded-md hover:bg-primary/10 transition text-start no-underline hover:no-underline',
          isActive && 'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Image fill src={organization.imageUrl} alt={'Organization'} className='rounded-sm object-cover' />
          </div>
          <span className='font-medium text-sm'>{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='py-2'>
        {routes.map((route) => (
          <Button
            key={route.href}
            asChild
            size={'sm'}
            className={cn(
              'flex justify-start pl-5 mb-1 [&_svg]:mr-1 hover:text-primary text-neutral-600 font-normal',
              pathname === route.href && 'text-primary hover:text-primary font-medium bg-accent'
            )}
            variant={'ghost'}
          >
            <Link href={route.href}>
              {route.icon}
              {route.label}
            </Link>
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
