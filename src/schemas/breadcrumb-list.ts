import type { AnySchema } from 'ajv';

export const breadcrumbListSchema: AnySchema = {
  title: 'Schema.org BreadcrumbList (JSON-LD)',
  type: 'object',
  required: ['@context', '@type', 'itemListElement'],
  properties: {
    '@context': { const: 'https://schema.org' },
    '@type': { const: 'BreadcrumbList' },

    itemListElement: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['@type', 'position', 'name', 'item'],
        properties: {
          '@type': { const: 'ListItem' },
          position: {
            type: 'integer',
            minimum: 1,
          },
          name: {
            type: 'string',
            minLength: 1,
          },
          item: {
            type: 'string',
            format: 'uri',
          },
        },
      },
    },
  },
};
