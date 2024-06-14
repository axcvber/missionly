import { ActionState } from '@/lib/create-safe-action'
import { Board } from '@prisma/client'
import { z } from 'zod'

export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, { message: 'Title is too short.' }),
  image: z.string({
    required_error: 'Image is required',
    invalid_type_error: 'Image is required',
  }),
})

export type InputType = z.infer<typeof CreateBoardSchema>
export type ReturnType = ActionState<InputType, Board>
