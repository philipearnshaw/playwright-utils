import type { AnySchema } from 'ajv';

// Schema for Brand, based on https://schema.org/Brand
export const brandSchema: AnySchema = {
  title: 'Schema.org Brand (JSON-LD)',
  type: 'object',
  required: ['@type', 'name'],
  properties: {
    '@type': { const: 'Brand' },
    name: { type: 'string', minLength: 1 },
  },
};
