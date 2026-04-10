import type { AnySchema } from 'ajv';

export const faqPageSchema: AnySchema = {
  title: 'Schema.org FAQPage (JSON-LD)',
  type: 'object',
  required: ['@context', '@type', 'mainEntity'],
  properties: {
    '@context': { const: 'https://schema.org' },
    '@type': { const: 'FAQPage' },

    mainEntity: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['@type', 'name', 'acceptedAnswer'],
        properties: {
          '@type': { const: 'Question' },
          name: { type: 'string', minLength: 1 },

          acceptedAnswer: {
            type: 'object',
            required: ['@type', 'text'],
            properties: {
              '@type': { const: 'Answer' },
              text: { type: 'string', minLength: 1 },
            },
          },
        },
      },
    },
  },
};
