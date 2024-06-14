import { ActionState } from '@/lib/create-safe-action'
import { List } from '@prisma/client'
import { z } from 'zod'

export const UpdateListSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, { message: 'Title is too short.' }),
  id: z.string(),
  boardId: z.string(),
})

export type InputType = z.infer<typeof UpdateListSchema>
export type ReturnType = ActionState<InputType, List>
