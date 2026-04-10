import type { AnySchema } from 'ajv';
import { imageObjectSchema } from './image';

const listItemSchema: AnySchema = {
  type: 'object',
  required: ['@type', 'position', 'name', 'url', 'image'],
  properties: {
    '@type': { const: 'ListItem' },
    position: { type: 'integer', minimum: 1 },
    name: { type: 'string', minLength: 1 },
    url: {
      anyOf: [
        { type: 'null' },
        { type: 'string', format: 'uri' },
        { type: 'string', pattern: '^(www\\.)[A-Za-z0-9.-]+\\/[\\S]*$' }, // Fix at source
      ],
    },
    image: { type: 'string', format: 'uri' },
  },
};

export const itemListSchema: AnySchema = {
  title: 'Schema.org ItemList (JSON-LD)',
  type: 'object',
  required: ['@type', '@context', 'itemListElement'],
  properties: {
    '@type': { const: 'ItemList' },
    '@context': {
      enum: ['https://schema.org', 'https://schema.org/'],
    },

    // Optional (present in your earlier examples, missing in this failing one)
    name: { type: 'string', minLength: 1 },
    numberOfItems: { type: 'integer', minimum: 0 },
    itemListOrder: { type: 'string', format: 'uri' },

    itemListElement: {
      type: 'array',
      minItems: 1,

      items: {
        anyOf: [
          listItemSchema,
          {
            type: 'array',
            minItems: 0, // allows []
            items: imageObjectSchema,
          },
        ],
      },
    },
  },
};
