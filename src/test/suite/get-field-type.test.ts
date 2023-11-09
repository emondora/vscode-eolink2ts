import * as assert from "assert";
import { getFieldType } from "../../utils/get-field-type";
import { EolinkApikit } from "../../interfaces/eolink.interface";

suite("getFieldType", () => {
  test("returns the correct type for a simple field", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "string",
      description: "A simple string field",
      required: true,
    };
    assert.strictEqual(getFieldType(data), "string");
  });

  test("returns the correct type for a required field with no description", () => {
    const data: EolinkApikit = { key: "foo", type: "number", required: true };
    assert.strictEqual(getFieldType(data), "number");
  });

  test("returns the correct type for an optional field with no description", () => {
    const data: EolinkApikit = { key: "foo", type: "boolean" };
    assert.strictEqual(getFieldType(data), "boolean");
  });

  test("returns the correct type for an unknown type", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "custom",
      description: "A custom field",
      required: true,
    };
    assert.strictEqual(getFieldType(data), "custom");
  });

  test("returns the correct type for an array field", () => {
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
    assert.strictEqual(getFieldType(data), "ReadonlyArray<foo>");
  });

  test("returns the correct type for an array field with no child list", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "array",
      description: "An array field",
      required: true,
    };
    assert.strictEqual(getFieldType(data), "ReadonlyArray<any>");
  });

  test("returns the correct type for a child list field", () => {
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
    assert.strictEqual(getFieldType(data), "foo");
  });

  test("returns the correct type for a child list field with no description", () => {
    const data: EolinkApikit = {
      key: "foo",
      type: "object",
      required: true,
      childList: [{ key: "bar", type: "string", required: true }],
    };
    assert.strictEqual(getFieldType(data), "foo");
  });
});
