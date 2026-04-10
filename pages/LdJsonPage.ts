import { expect, Locator, Page } from '@playwright/test';
import Ajv, { AnySchema } from 'ajv';
import addFormats from 'ajv-formats';
import { schemaMap, SchemaType } from '../schemas/schema-map';

export class LdJsonPage {
  private readonly page: Page;
  private readonly ldJsonLocators: Locator;
  private readonly ajv: Ajv;

  public constructor(page: Page) {
    this.page = page;
    this.ldJsonLocators = this.page.locator('script[type="application/ld+json"]');
    this.ajv = new Ajv({ allErrors: true, verbose: true });
    addFormats(this.ajv);
  }

  public async getLdJsonData(): Promise<any[]> {
    const dataObjects: object[] = [];

    for (const locator of await this.ldJsonLocators.all()) {
      const content = await locator.textContent();
      const dataObject = content ? JSON.parse(content.trim()) : null;
      if (dataObject) {
        dataObjects.push(dataObject);
      }
    }
    return dataObjects;
  }

  public assertRequiredSchemasPresent(ldJsonData: any[], requiredSchemaTypes: SchemaType[]): void {
    const foundTypes = ldJsonData.map((obj) => obj['@type']);
    const missingTypes = requiredSchemaTypes.filter((type) => !foundTypes.includes(type));
    if (missingTypes.length > 0) {
      console.log(`ERROR: Missing required schema types: ${missingTypes.join(', ')}`);
    }
  }

  public assertLdJsonData(ldJsonData: any): void {
    const schema = schemaMap[ldJsonData['@type'] as SchemaType];
    if (schema) {
      this.validateSchema(schema, ldJsonData);
    } else {
      console.log(`Missing definition of schema type ${ldJsonData['@type']}`);
    }
  }

  /**
   * Helper functions
   */
  private validateSchema(schema: AnySchema, data: unknown): void {
    const validatefn = this.ajv.compile(schema);
    const result = validatefn(data);
    const errors = validatefn.errors?.map((e) => `${e.instancePath || '(root)'} ${e.message}`).join('\n');

    expect
      .soft(
        result,
        `Validation ${JSON.stringify(schema, null, 2)} failed:\n${errors}\ndata: ${JSON.stringify(data, null, 2)}`
      )
      .toBe(true);
  }
}
