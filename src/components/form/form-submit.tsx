'use client'

import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?: ButtonProps['variant']
}

export const FormSubmit = ({ children, disabled, variant, className }: FormSubmitProps) => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending || disabled} type='submit' variant={variant} size={'sm'} className={cn(className)}>
      {children}
    </Button>
  )
}
