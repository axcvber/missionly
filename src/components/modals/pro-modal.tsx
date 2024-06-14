'use client'

import React from 'react'
import { useProModal } from '@/hooks/use-pro-modal'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { useAction } from '@/hooks/use-action'
import { stripeRedirect } from '@/actions/stripe-redirect'

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
      <DialogContent className='max-w-md p-0 overflow-hidden'>
        <div className='aspect-video relative flex items-center justify-center'>
          <Image fill src='/premium.png' alt='Premium' className='object-contain' />
        </div>
        <div className='text-neutral-700 mx-auto space-y-6 p-6'>
          <h2 className='font-semibold text-xl'>Upgrade to Missionly Pro Today!</h2>
          <p className='text-sm font-semibold text-neutral-600'>Explore the best of Missionly</p>
          <div className='pl-3'>
            <ul className='text-sm list-disc'>
              <li>Unlimited boards</li>
              <li>Advanced checklist</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button onClick={onClick} disabled={isLoading} className='w-full'>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
