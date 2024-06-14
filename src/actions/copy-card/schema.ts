import { ActionState } from '@/lib/create-safe-action'
import { Card } from '@prisma/client'
import { z } from 'zod'

export const CopyCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
})

export type InputType = z.infer<typeof CopyCardSchema>
export type ReturnType = ActionState<InputType, Card>
