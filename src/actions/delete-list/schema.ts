import { ActionState } from '@/lib/create-safe-action'
import { List } from '@prisma/client'
import { z } from 'zod'

export const DeleteListSchema = z.object({
  id: z.string(),
  boardId: z.string(),
})

export type InputType = z.infer<typeof DeleteListSchema>
export type ReturnType = ActionState<InputType, List>
