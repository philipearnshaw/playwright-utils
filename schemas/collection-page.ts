import type { AnySchema } from 'ajv';

import { productEmbeddedSchema } from './productEmbedded';
import { organizationEmbeddedSchema } from './organizationEmbedded';

export const collectionPageSchema: AnySchema = {
  title: 'Schema.org CollectionPage (JSON-LD)',
  type: 'object',
  required: ['@context', '@type', 'url', 'name', 'description', 'publisher', 'mainEntity'],
  properties: {
    '@context': { const: 'https://schema.org' },
    '@type': { const: 'CollectionPage' },

    url: { type: 'string', format: 'uri' },
    name: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },

    publisher: organizationEmbeddedSchema,

    mainEntity: {
      type: 'object',
      required: ['@type', 'itemListOrder', 'itemListElement'],
      properties: {
        '@type': { const: 'ItemList' },
        itemListOrder: { type: 'string', format: 'uri' },

        itemListElement: {
          type: 'array',
          minItems: 1,
          items: productEmbeddedSchema,
        },
      },
    },
  },
};
