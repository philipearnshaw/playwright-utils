import type { AnySchema } from 'ajv';

export const imageObjectSchema: AnySchema = {
  title: 'Schema.org Image (ImageObject or URL)',
  anyOf: [
    {
      type: 'object',
      required: ['@type'],
      properties: {
        '@type': { const: 'ImageObject' },
        url: { type: 'string', format: 'uri' },
        width: { type: 'integer', minimum: 1 },
        height: { type: 'integer', minimum: 1 },
        caption: { type: 'string' },
      },
    },
    {
      type: 'string',
    },
  ],
};
