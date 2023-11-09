import * as assert from "assert";
import { getField } from "../../utils/get-field";
import { EolinkApikit } from "../../interfaces/eolink.interface";

suite("getField", () => {
  test("returns the correct field for a simple required field", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "string",
      description: "A simple string field",
      required: true,
    };
    const expected = `  /**
   * A simple string field
   */
  foo: string;\n`;
    assert.strictEqual(getField(data, false), expected);
  });

  test("returns the correct field for a simple optional field", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "string",
      description: "A simple string field",
      required: false,
    };
    const expected = `  /**
   * A simple string field
   */
  foo?: string;\n`;
    assert.strictEqual(getField(data, false), expected);
  });

  test("returns the correct field for a readonly simple required field", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "string",
      description: "A simple string field",
      required: true,
    };
    const expected = `  /**
   * A simple string field
   */
  readonly foo: string;\n`;
    assert.strictEqual(getField(data, true), expected);
  });

  test("returns the correct field for a readonly simple optional field", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "string",
      description: "A simple string field",
      required: false,
    };
    const expected = `  /**
   * A simple string field
   */
  readonly foo?: string;\n`;
    assert.strictEqual(getField(data, true), expected);
  });

  test("returns the correct field for an array field", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "array",
      description: "An array field",
      required: true,
      childList: [
        {
          key: "bar",
          type: "string",
          description: "A child list field",
          required: false,
        },
      ],
    };
    const expected = `  /**
   * An array field
   */
  foo: ReadonlyArray<foo>;\n`;
    assert.strictEqual(getField(data, false), expected);
  });

  test("returns the correct field for an array field with no child list", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "array",
      description: "An array field",
      required: true,
    };
    const expected = `  /**
   * An array field
   */
  foo: ReadonlyArray<any>;\n`;
    assert.strictEqual(getField(data, false), expected);
  });

  test("returns the correct field for a child list field", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "object",
      description: "A child list field",
      required: true,
      childList: [
        {
          key: "bar",
          type: "string",
          description: "A simple string field",
          required: true,
        },
      ],
    };
    const expected = `  /**
   * A child list field
   */
  foo: foo;\n`;
    assert.strictEqual(getField(data, false), expected);
  });

  test("returns the correct field for a child list field with no description", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "object",
      required: true,
      childList: [{ key: "bar", type: "string", required: true }],
    };
    const expected = `  /**
   * 
   */
  foo: foo;\n`;
    assert.strictEqual(getField(data, false), expected);
  });
});