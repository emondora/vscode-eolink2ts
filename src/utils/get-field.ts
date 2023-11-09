import { EolinkApikit } from "../interfaces/eolink.interface";
import { getFieldType } from "./get-field-type";

/**
 * Returns a string representation of a field in EolinkApikit format.
 * @param data - The EolinkApikit data object.
 * @param readonly - Whether the field should be readonly or not.
 * @returns A string representation of the field.
 */
export function getField(data: EolinkApikit, readonly: boolean) {
  let content = `  /**\n`;
  content += `   * ${data.description || ''}\n`;
  content += `   */\n`;
  if (readonly) {
    content += `  readonly ${data.key}`;
  } else {
    content += `  ${data.key}`;
  }
  if (data.required) {
    content += `: ${getFieldType(data)};\n`;
  } else {
    content += `?: ${getFieldType(data)};\n`;
  }
  return content;
}
