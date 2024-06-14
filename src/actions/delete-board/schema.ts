import { ActionState } from '@/lib/create-safe-action'
import { Board } from '@prisma/client'
import { z } from 'zod'

export const DeleteBoardSchema = z.object({
  id: z.string(),
})

export type InputType = z.infer<typeof DeleteBoardSchema>
export type ReturnType = ActionState<InputType, Board>
