import type { AnySchema } from 'ajv';
import { imageObjectSchema } from './image';

export const organizationEmbeddedSchema: AnySchema = {
  title: 'Schema.org Organization (JSON-LD)',
  type: 'object',
  required: ['@type', 'name', 'url'],
  properties: {
    '@context': {
      const: 'https://schema.org',
    },
    '@type': {
      const: 'Organization',
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    url: {
      type: 'string',
      format: 'uri',
    },
    logo: imageObjectSchema,
    description: { type: 'string', minLength: 1 },
  },
};
