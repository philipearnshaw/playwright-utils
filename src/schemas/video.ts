import type { AnySchema } from 'ajv';

// Schema for VideoObject, based on https://schema.org/VideoObject
export const videoObjectSchema: AnySchema = {
  title: 'Schema.org VideoObject (JSON-LD)',
  type: 'object',
  required: ['@context', '@type', 'name', 'description', 'thumbnailUrl', 'contentUrl'],
  properties: {
    '@context': { const: 'https://schema.org' },
    '@type': { const: 'VideoObject' },
    name: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
      minLength: 0, // Fix at source
    },
    thumbnailUrl: {
      type: 'string',
      minLength: 0, // Fix at source
    },
    contentUrl: {
      type: 'string',
      format: 'uri',
    },
  },
};
