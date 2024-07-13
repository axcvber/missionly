import React from 'react'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { DiamondPlus } from 'lucide-react'
import MobileSidebar from './mobile-sidebar'
import FormPopover from '@/components/form/form-popover'
import { checkSubscription } from '@/lib/subscription'

const Navbar = async () => {
  const isPro = await checkSubscription()

  return (
    <header className='sticky top-0 z-50 w-full h-16 min-h-16 px-4 border-b bg-white flex items-center shadow-sm'>
      <MobileSidebar isPro={isPro} />
      <div className='flex items-center gap-x-3'>
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <FormPopover align='start' side='bottom' sideOffset={12}>
          <Button size={'sm'} className='hidden md:flex'>
            <DiamondPlus />
            Create
          </Button>
        </FormPopover>

        <FormPopover align='center' side='bottom' sideOffset={12}>
          <Button size={'icon'} className='flex md:hidden'>
            <DiamondPlus />
          </Button>
        </FormPopover>
      </div>
      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={'/organization/:id'}
          afterSelectOrganizationUrl={'/organization/:id'}
          afterLeaveOrganizationUrl={'/select-org'}
          appearance={{
            elements: {
              organizationSwitcherTrigger: 'h-9 rounded-sm',
              organizationSwitcherPopoverCard: 'rounded-md shadow-md',
              organizationSwitcherPopoverMain: 'rounded-md',
            },
          }}
        />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
              userButtonPopoverCard: 'rounded-md shadow-md',
              userButtonPopoverMain: 'rounded-md',
            },
          }}
        />
      </div>
    </header>
  )
}

export default Navbar
