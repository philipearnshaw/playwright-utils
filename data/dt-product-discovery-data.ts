import { SchemaType } from '../schemas/schema-map';

//export const appURL = 'https://dt-product-discovery-1174-n01.cf.dev-paas.bskyb.com';
export const appURL = 'https://dt-product-discovery-1174-n01.stage-cf.sky.com';

export const dtProductDiscoveryData = [
  { url: 'dt_product_discovery/homepage', requiredSchemaTypes: ['Organization', 'WebSite', 'WebPage'] as SchemaType[] },
  {
    url: 'dt_product_discovery/broadband-base',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/broadband/full-fibre-broadband',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'Product', 'VideoObject', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/broadband/gaming',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/broadband/wifi-max',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/deals',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'CollectionPage',
      'FAQPage',
      'Product',
      'VideoObject',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/glass',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'ImageObject', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/glass/43-inch',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/glass/55-inch',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/glass/65-inch',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/glass/glass-air',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'ItemList', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/glass/glass-gen-2',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'VideoObject',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/cinema',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/cinema/paramount-plus',
    requiredSchemaTypes: ['BreadcrumbList', 'ImageObject', 'ItemList', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/kids',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/cricket',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/f1',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/football',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/football/efl',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'ItemList', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/football/premier-league',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/football/wsl',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'ItemList', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/golf',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/rugby',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/tennis',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/sports/sky-sports-plus',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/stream',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tv/ultimate-tv',
    requiredSchemaTypes: [
      'BreadcrumbList',
      'FAQPage',
      'ImageObject',
      'ItemList',
      'Product',
      'WebSite',
      'WebPage',
    ] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/tvandbroadband',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'ImageObject', 'Product', 'WebSite', 'WebPage'] as SchemaType[],
  },
  {
    url: 'dt_product_discovery/watch',
    requiredSchemaTypes: ['BreadcrumbList', 'FAQPage', 'ItemList', 'WebSite', 'WebPage'] as SchemaType[],
  },
] as const;
