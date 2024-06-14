import { ActionState } from '@/lib/create-safe-action'
import { Card } from '@prisma/client'
import { z } from 'zod'

export const StripeRedirectSchema = z.object({})

export type InputType = z.infer<typeof StripeRedirectSchema>
export type ReturnType = ActionState<InputType, string>
