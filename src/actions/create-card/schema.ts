import { ActionState } from '@/lib/create-safe-action'
import { Card } from '@prisma/client'
import { z } from 'zod'

export const CreateCardSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, { message: 'Title is too short.' }),
  boardId: z.string(),
  listId: z.string(),
})

export type InputType = z.infer<typeof CreateCardSchema>
export type ReturnType = ActionState<InputType, Card>
