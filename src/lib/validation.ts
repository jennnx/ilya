import { z, type ZodTypeAny, type typeToFlattenedError } from "zod";

export const validateForm = <TSchema extends ZodTypeAny>(
  formData: FormData,
  schema: TSchema,
):
  | [z.infer<TSchema>, null]
  | [null, typeToFlattenedError<z.infer<TSchema>>] => {
  const result = schema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = result.error.flatten();
    return [null, errors];
  }

  return [result.data, null];
};
