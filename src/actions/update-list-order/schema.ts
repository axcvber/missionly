import { ActionState } from '@/lib/create-safe-action'
import { List } from '@prisma/client'
import { z } from 'zod'

export const UpdateListOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  boardId: z.string(),
})

export type InputType = z.infer<typeof UpdateListOrderSchema>
export type ReturnType = ActionState<InputType, List[]>
