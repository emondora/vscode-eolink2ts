import * as assert from "assert";
import { getInterface } from "../../utils/get-interface";
import { EolinkApikit } from "../../interfaces/eolink.interface";

suite("getInterface", () => {
  test("returns the correct interface with a type name", () => {
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
    ];
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
}\n`;
    assert.strictEqual(getInterface(list, typeName, false), expected);
  });

  test("returns the correct interface without a type name", () => {
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
    ];
    const expected = `export interface {
  /**
   * A simple string field
   */
  foo: string;

  /**
   * A simple number field
   */
  bar?: number;
}\n`;
    assert.strictEqual(getInterface(list, "", false), expected);
  });

  test("returns the correct readonly interface with a type name", () => {
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
    ];
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
}\n`;
    assert.strictEqual(getInterface(list, typeName, true), expected);
  });

  test("returns the correct readonly interface without a type name", () => {
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
    ];
    const expected = `export interface {
  /**
   * A simple string field
   */
  readonly foo: string;

  /**
   * A simple number field
   */
  readonly bar?: number;
}\n`;
    assert.strictEqual(getInterface(list, "", true), expected);
  });

  test("returns the correct interface with an array field", () => {
    const list: ReadonlyArray<EolinkApikit> = [
      {
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
      },
    ];
    const typeName = "MyInterface";
    const expected = `export interface MyInterface {
  /**
   * An array field
   */
  foo: ReadonlyArray<foo>;
}\n`;
    assert.strictEqual(getInterface(list, typeName, false), expected);
  });

  test("returns the correct interface with an array field with no child list", () => {
    const list: ReadonlyArray<EolinkApikit> = [
      {
        key: "foo",
        type: "array",
        description: "An array field",
        required: true,
      },
    ];
    const typeName = "MyInterface";
    const expected = `export interface MyInterface {
  /**
   * An array field
   */
  foo: ReadonlyArray<any>;
}\n`;
    assert.strictEqual(getInterface(list, typeName, false), expected);
  });

  test("returns the correct interface with a child list field", () => {
    const list: ReadonlyArray<EolinkApikit> = [
      {
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
      },
    ];
    const typeName = "MyInterface";
    const expected = `export interface MyInterface {
  /**
   * A child list field
   */
  foo: foo;
}\n`;
    assert.strictEqual(getInterface(list, typeName, false), expected);
  });

  test("returns the correct interface with a child list field with no description", () => {
    const list: ReadonlyArray<EolinkApikit> = [
      {
        key: "foo",
        type: "object",
        required: true,
        childList: [{ key: "bar", type: "string", required: true }],
      },
    ];
    const typeName = "MyInterface";
    const expected = `export interface MyInterface {
  /**
   * 
   */
  foo: foo;
}\n`;
    assert.strictEqual(getInterface(list, typeName, false), expected);
  });
});