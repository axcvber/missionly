'use client'

import React, { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormErrors } from './form-errors'
import { cn } from '@/lib/utils'

interface FormInputProps {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, type, disabled, required, errors, placeholder, defaultValue = '', onBlur, className }, ref) => {
    const { pending } = useFormStatus()
    return (
      <div className='space-y-2'>
        <div className='space-y-1'>
          {label && (
            <Label htmlFor={id} className='text-xs font-semibold text-neutral-700'>
              {label}
            </Label>
          )}
          <Input
            id={id}
            name={id}
            ref={ref}
            onBlur={onBlur}
            defaultValue={defaultValue}
            required={required}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn('text-sm px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
