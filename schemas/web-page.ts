import type { AnySchema } from 'ajv';
import { breadcrumbListSchema } from './breadcrumb-list';

// Schema for WebPage, based on https://schema.org/WebPage
export const webPageSchema: AnySchema = {
  title: 'Schema.org WebPage (JSON-LD)',
  type: 'object',
  required: ['@context', '@type', 'name', 'url', 'description', 'inLanguage', 'breadcrumb'],
  properties: {
    '@context': {
      const: 'https://schema.org',
    },
    '@type': {
      const: 'WebPage',
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    url: {
      type: 'string',
      format: 'uri',
    },
    description: {
      type: 'string',
      minLength: 1,
    },
    inLanguage: {
      type: 'string',
      const: 'en-GB',
    },
    breadcrumb: {
      anyOf: [
        breadcrumbListSchema,
        {
          type: 'string',
          minLength: 1,
        },
      ],
    },
  },
};
