import type { AnySchema } from 'ajv';
import { priceSpecificationSchema } from './price-specification';

export const offerSchema: AnySchema = {
  title: 'Schema.org Offer (JSON-LD)',
  type: 'object',
  required: ['@type'],
  properties: {
    '@type': { const: 'Offer' },

    availability: {
      type: 'string',
      format: 'uri',
    },

    priceSpecification: priceSpecificationSchema,
  },
};
