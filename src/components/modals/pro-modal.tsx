'use client'

import React from 'react'
import { useProModal } from '@/hooks/use-pro-modal'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { useAction } from '@/hooks/use-action'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { Crown } from 'lucide-react'
import { siteConfig } from '@/config/site'

const ProModal = () => {
  const isOpen = useProModal((state) => state.isOpen)
  const onClose = useProModal((state) => state.onClose)
  const { toast } = useToast()

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  const onClick = () => {
    execute({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md p-4 overflow-hidden'>
        <div className='aspect-video relative flex items-center justify-center'>
          <Image priority fill src='/premium.png' alt='Premium' className='object-contain' />
        </div>
        <div className='text-neutral-700 mx-auto space-y-3 p-6'>
          <h2 className='font-semibold text-xl'>Upgrade to {siteConfig.name} Pro Today!</h2>
          <p className='text-sm font-semibold text-neutral-600'>Explore the best of {siteConfig.name}</p>
          <div className='pl-3'>
            <ul className='text-sm list-disc space-y-2'>
              <li>Unlimited boards</li>
              <li>Advanced checklist</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button onClick={onClick} disabled={isLoading} className='w-full'>
            <Crown />
            Upgrade Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
