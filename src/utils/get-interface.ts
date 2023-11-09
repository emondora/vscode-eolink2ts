import { EolinkApikit } from "../interfaces/eolink.interface";
import { getField } from "./get-field";

/**
 * Generates an interface based on a list of EolinkApikit objects.
 * @param list - The list of EolinkApikit objects.
 * @param typeName - The name of the interface to be generated.
 * @param readonly - Whether the generated interface should be readonly or not.
 * @returns The generated interface as a string.
 */
export function getInterface(
  list: ReadonlyArray<EolinkApikit>,
  typeName: string,
  readonly: boolean
) {
  let content = "";
  if (typeName) {
    content += `export interface ${typeName} {\n`;
  } else {
    content += `export interface {\n`;
  }
  list.forEach((item, index) => {
    content += getField(item, readonly);
    if (index !== list.length - 1) {
      content += `\n`;
    }
  });
  content += `}\n`;
  return content;
}
