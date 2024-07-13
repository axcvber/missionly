'use client'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { Crown } from 'lucide-react'
import React from 'react'

interface SubscriptionButtonProps {
  isPro: boolean
  className?: string
}

const SubscriptionButton = ({ isPro, className }: SubscriptionButtonProps) => {
  const { toast } = useToast()
  const onOpenProModal = useProModal((state) => state.onOpen)
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
    if (isPro) {
      execute({})
    } else {
      onOpenProModal()
    }
  }

  return (
    <Button className={className} onClick={onClick} disabled={isLoading}>
      <Crown />
      {isPro ? 'Manage subscription' : 'Upgrade to pro'}
    </Button>
  )
}

export default SubscriptionButton
