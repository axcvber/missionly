'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Sidebar from './sidebar'

const MobileSidebar: React.FC<{ isPro: boolean }> = ({ isPro }) => {
  const pathname = usePathname()
  const isOpen = useMobileSidebar((state) => state.isOpen)
  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <>
      <Button onClick={onOpen} className='flex md:hidden mr-2' variant={'outline-primary'} size={'icon'}>
        <Menu />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='p-2 pt-14'>
          <Sidebar isPro={isPro} storageKey='t-sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar
