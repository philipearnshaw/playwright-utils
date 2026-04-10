import type { AnySchema } from 'ajv';

// Schema for WebSite (JSON-LD)
export const webSiteSchema: AnySchema = {
  title: 'Schema.org WebSite (JSON-LD)',
  type: 'object',
  required: ['@context', '@type', 'name', 'url', 'description'],
  properties: {
    '@context': { const: 'https://schema.org' },
    '@type': { const: 'WebSite' },
    name: { type: 'string', minLength: 1 },
    url: { type: 'string', format: 'uri' },
    description: { type: 'string', minLength: 1 },
  },
};
