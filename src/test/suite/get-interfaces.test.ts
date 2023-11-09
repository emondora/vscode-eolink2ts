import * as assert from "assert";
import { EolinkApikit } from "../../interfaces/eolink.interface";
import { getInterfaces } from "../../utils/get-interfaces";

suite("getInterfaces", () => {
  const list: ReadonlyArray<EolinkApikit> = [
    {
      key: "foo",
      type: "string",
      description: "A simple string field",
      required: true,
    },
    {
      key: "bar",
      type: "number",
      description: "A simple number field",
      required: false,
    },
    {
      key: "baz",
      type: "object",
      description: "An object field",
      required: true,
      childList: [
        {
          key: "qux",
          type: "string",
          description: "A child string field",
          required: true,
        },
      ],
    },
  ];

  test("returns the correct interface with a type name", () => {
    const typeName = "MyInterface";
    const expected = `export interface MyInterface {
  /**
   * A simple string field
   */
  foo: string;

  /**
   * A simple number field
   */
  bar?: number;

  /**
   * An object field
   */
  baz: baz;
}
export interface baz {
  /**
   * A child string field
   */
  qux: string;
}\n`;
    assert.strictEqual(getInterfaces(list, typeName, false), expected);
  });

  test("returns the correct interface without a type name", () => {
    const expected = `export interface {
  /**
   * A simple string field
   */
  foo: string;

  /**
   * A simple number field
   */
  bar?: number;

  /**
   * An object field
   */
  baz: baz;
}
export interface baz {
  /**
   * A child string field
   */
  qux: string;
}\n`;
    assert.strictEqual(getInterfaces(list, "", false), expected);
  });

  test("returns the correct readonly interface with a type name", () => {
    const typeName = "MyInterface";
    const expected = `export interface MyInterface {
  /**
   * A simple string field
   */
  readonly foo: string;

  /**
   * A simple number field
   */
  readonly bar?: number;

  /**
   * An object field
   */
  readonly baz: baz;
}
export interface baz {
  /**
   * A child string field
   */
  readonly qux: string;
}\n`;
    assert.strictEqual(getInterfaces(list, typeName, true), expected);
  });

  test("returns the correct readonly interface without a type name", () => {
    const expected = `export interface {
  /**
   * A simple string field
   */
  readonly foo: string;

  /**
   * A simple number field
   */
  readonly bar?: number;

  /**
   * An object field
   */
  readonly baz: baz;
}
export interface baz {
  /**
   * A child string field
   */
  readonly qux: string;
}\n`;
    assert.strictEqual(getInterfaces(list, "", true), expected);
  });

  test("returns the correct interface with a filtered list", () => {
    const typeName = "MyInterface";
    const expected = `export interface MyInterface {
  /**
   * A child string field
   */
  readonly qux: string;
}\n`;
    assert.strictEqual(getInterfaces(list, typeName, true, "baz"), expected);
  });
});