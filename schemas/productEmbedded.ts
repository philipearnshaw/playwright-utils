import type { AnySchema } from 'ajv';

import { brandSchema } from './brand';
import { offerSchema } from './offer';

export const productEmbeddedSchema: AnySchema = {
  type: 'object',
  required: ['@type', 'name', 'brand', 'offers'],
  properties: {
    '@type': { const: 'Product' },
    name: { type: 'string', minLength: 1 },
    sku: { type: 'string', minLength: 1 },
    brand: brandSchema,
    offers: offerSchema,
  },
};
