'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'

const MobileSidebar = () => {
  const pathname = usePathname()
  // const [isMounted, setIsMounted] = useState(false)

  const isOpen = useMobileSidebar((state) => state.isOpen)
  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <>
      <Button onClick={onOpen} className='block md:hidden mr-2' variant={'ghost'} size={'sm'}>
        <Menu className='w-4 h-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='p-2 pt-10'>
          <Sidebar storageKey='t-sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar
