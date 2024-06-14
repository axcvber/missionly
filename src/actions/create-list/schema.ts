import { ActionState } from '@/lib/create-safe-action'
import { List } from '@prisma/client'
import { z } from 'zod'

export const CreateListSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, { message: 'Title is too short.' }),
  boardId: z.string(),
})

export type InputType = z.infer<typeof CreateListSchema>
export type ReturnType = ActionState<InputType, List>
