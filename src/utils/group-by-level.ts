import { EolinkApikit } from "../interfaces/eolink.interface";

/**
 * Groups an array of EolinkApikit objects by their level.
 * @param list - The array of EolinkApikit objects to group.
 * @param typeName - The name of the type of objects in the array.
 * @param level - The current level of the objects being processed. Defaults to 0.
 * @param result - The resulting array of grouped EolinkApikit objects. Defaults to an empty array.
 * @returns The resulting array of grouped EolinkApikit objects.
 */
export function groupByLevel(
  list: ReadonlyArray<EolinkApikit>,
  typeName?: string
) {
  let resultList: EolinkApikit[][] = [];
  const recursiveList = (
    innerList: ReadonlyArray<EolinkApikit>,
    innerTypeName?: string
  ) => {
    const levelList: EolinkApikit[] = [];
    innerList.forEach((item) => {
      if (innerTypeName) {
        levelList.push({
          ...item,
          typeName: innerTypeName
        });
      } else {
        levelList.push(item);
      }
    });
    resultList.push(levelList);
    innerList.forEach((item) => {
      // 如果当前对象有子对象，就递归处理子对象
      if (item.childList && item.childList.length > 0) {
        recursiveList(item.childList, item.key);
      }
    });
  };
  recursiveList(list, typeName);
  return resultList;
}
