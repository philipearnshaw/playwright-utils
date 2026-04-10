import type { AnySchema } from 'ajv';

import { brandSchema } from './brand';
import { imageObjectSchema } from './image';
import { offerSchema } from './offer';

export const productRootSchema: AnySchema = {
  title: 'Schema.org Product (JSON-LD)',
  type: 'object',
  required: ['@context', '@type', 'name', 'brand'],
  properties: {
    '@context': { enum: ['https://schema.org', 'https://schema.org/'] },
    '@type': { const: 'Product' },

    name: { type: 'string', minLength: 1 },

    image: imageObjectSchema,

    description: { type: 'string', minLength: 1 },

    sku: { type: 'string', minLength: 0 },
    mpn: { type: 'string', minLength: 1 },

    brand: brandSchema,

    review: {
      type: 'object',
      required: ['@type', 'reviewRating', 'author'],
      properties: {
        '@type': { const: 'Review' },

        reviewRating: {
          type: 'object',
          required: ['@type', 'ratingValue', 'bestRating'],
          properties: {
            '@type': { const: 'Rating' },
            ratingValue: { type: 'string', minLength: 1 },
            bestRating: { type: 'string', minLength: 1 },
          },
        },

        author: {
          type: 'object',
          required: ['@type', 'name'],
          properties: {
            '@type': { const: 'Person' },
            name: { type: 'string', minLength: 1 },
          },
        },
      },
    },

    aggregateRating: {
      type: 'object',
      required: ['@type', 'ratingValue', 'reviewCount'],
      properties: {
        '@type': { const: 'AggregateRating' },
        ratingValue: { type: 'string', minLength: 1 },
        reviewCount: { type: 'string', minLength: 1 },
      },
    },
    offers: {
      anyOf: [
        offerSchema,
        {
          type: 'array',
          minItems: 1,
          items: offerSchema,
        },
      ],
    },
  },
};
