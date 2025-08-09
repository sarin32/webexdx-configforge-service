import * as Joi from 'joi';

export function validateObject<ValueType>(schema: Joi.Schema, data: unknown) {
  const {
    error,
    value,
  }: { error: Joi.ValidationError | undefined; value: ValueType } =
    schema.validate(data, {
      abortEarly: true,
      allowUnknown: true,
      errors: { escapeHtml: true },
    });

  return { value, error };
}

export function objectIdSchema(required = true) {
  let schema = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
  if (required) schema = schema.required();
  return schema;
}
