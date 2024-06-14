import { z } from 'zod'

export type FieldsErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldsErrors<TInput>
  error?: string | null
  data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationsResult = schema.safeParse(data)
    if (!validationsResult.success) {
      return {
        fieldErrors: validationsResult.error.flatten().fieldErrors as FieldsErrors<TInput>,
      }
    }

    return handler(validationsResult.data)
  }
}
