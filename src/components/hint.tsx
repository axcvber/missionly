import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface HintProps {
  children: React.ReactNode
  description: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const Hint = ({ children, description, side = 'left', align = 'start', sideOffset = 0 }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent sideOffset={sideOffset} side={side} align={align} className='text-xs max-w-[220px] break-words'>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
