import * as assert from "assert";
import { EolinkApikit } from "../../interfaces/eolink.interface";
import { groupByLevel } from "../../utils/group-by-level";

suite("groupByLevel", () => {
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

  test("groups objects by level", () => {
    const expected = [
      [list[0], list[1], list[2]],
      [{
        key: "qux",
        type: "string",
        description: "A child string field",
        typeName: "baz",
        required: true,
      }],
    ];
    assert.deepStrictEqual(groupByLevel(list, ""), expected);
  });

  test("handles empty list", () => {
    const expected: EolinkApikit[][] = [[]];
    assert.deepStrictEqual(groupByLevel([], ""), expected);
  });
});