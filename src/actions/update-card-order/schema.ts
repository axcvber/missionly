import { ActionState } from '@/lib/create-safe-action'
import { Card } from '@prisma/client'
import { z } from 'zod'

export const UpdateCardOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  boardId: z.string(),
})

export type InputType = z.infer<typeof UpdateCardOrderSchema>
export type ReturnType = ActionState<InputType, Card[]>
