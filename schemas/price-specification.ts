import type { AnySchema } from 'ajv';

export const priceSpecificationSchema: AnySchema = {
  anyOf: [
    // UnitPriceSpecification (older / simpler data)
    {
      type: 'object',
      required: ['@type', 'price', 'priceCurrency'],
      properties: {
        '@type': { const: 'UnitPriceSpecification' },
        price: { anyOf: [{ type: 'number' }, { type: 'string' }] },
        priceCurrency: {
          type: 'string',
          minLength: 3,
          maxLength: 3,
        },
        unitCode: { type: 'string' },
        billingIncrement: { type: 'number', minimum: 0 },
      },
    },

    // CompoundPriceSpecification (current data)
    {
      type: 'object',
      required: ['@type', 'priceComponent'],
      properties: {
        '@type': { const: 'CompoundPriceSpecification' },
        priceComponent: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['@type', 'price', 'priceCurrency'],
            properties: {
              '@type': { const: 'UnitPriceSpecification' },
              price: { anyOf: [{ type: 'number' }, { type: 'string' }] },
              priceCurrency: {
                type: 'string',
                minLength: 3,
                maxLength: 3,
              },
              unitCode: { type: 'string' },
              billingIncrement: { type: 'number', minimum: 0 },
            },
          },
        },
      },
    },
  ],
};
