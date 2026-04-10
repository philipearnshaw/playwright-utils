import type { AnySchema } from 'ajv';
import {
  brandSchema,
  breadcrumbListSchema,
  collectionPageSchema,
  faqPageSchema,
  organizationRootSchema,
  videoObjectSchema,
  webPageSchema,
  webSiteSchema,
} from '.';
import { productRootSchema } from './productRoot';
import { imageObjectSchema } from './image';
import { itemListSchema } from './ItemList';

export const schemaMap = {
  Brand: brandSchema,
  BreadcrumbList: breadcrumbListSchema,
  CollectionPage: collectionPageSchema,
  FAQPage: faqPageSchema,
  ImageObject: imageObjectSchema,
  ItemList: itemListSchema,
  Organization: organizationRootSchema,
  Product: productRootSchema,
  VideoObject: videoObjectSchema,
  WebPage: webPageSchema,
  WebSite: webSiteSchema,
} satisfies Record<string, AnySchema>;

export type SchemaType = keyof typeof schemaMap;
