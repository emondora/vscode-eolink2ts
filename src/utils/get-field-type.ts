import { EolinkApikit } from "../interfaces/eolink.interface";

export const typeMap = new Map<string, string>([
  ["int", "number"],
  ["double", "number"],
  ["float", "number"],
]);

/**
 * Returns the type of a field in EolinkApikit format.
 * @param data The EolinkApikit object to get the field type from.
 * @returns The type of the field.
 */
export function getFieldType(data: EolinkApikit) {
  if (data.type === "array") {
    if (data.childList && data.childList.length > 0) {
      return `ReadonlyArray<${data.key}>`;
    }
    return `ReadonlyArray<any>`;
  }
  if (data.type === "object") {
    return `${data.key}`;
  }
  if (typeMap.has(data.type)) {
    return typeMap.get(data.type) || data.type;
  }
  return data.type;
}
