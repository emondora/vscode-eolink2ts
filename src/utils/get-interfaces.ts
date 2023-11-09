import { EolinkApikit } from "../interfaces/eolink.interface";
import { getInterface } from "./get-interface";
import { groupByLevel } from "./group-by-level";

/**
 * Returns a string containing interfaces generated from the provided list of EolinkApikit objects.
 * @param list - The list of EolinkApikit objects to generate interfaces from.
 * @param typeName - The name of the type to generate interfaces for.
 * @param readonly - Whether the generated interfaces should be readonly. Defaults to true.
 * @param filterKey - Optional key to filter the list of EolinkApikit objects.
 * @returns A string containing the generated interfaces.
 */
export function getInterfaces(
  list: ReadonlyArray<EolinkApikit>,
  typeName: string,
  readonly: boolean,
  filterKey?: string
) {
  let content = "";
  if (filterKey) {
    const data = list.filter((item) => item.key === filterKey)[0];
    if (data.childList && data.childList.length > 0) {
      list = data.childList;
    }
  }
  const levelList = groupByLevel(list, typeName);
  levelList.forEach((flatList, index) => {
    content += getInterface(
      flatList,
      index === 0 ? typeName : flatList[0].typeName || "",
      readonly
    );
  });
  return content;
}

