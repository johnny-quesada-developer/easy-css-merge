export type Excludes = string;

/**
 * Returns true to include the value, false to exclude it
 */
export type MergeFilterPredicate = (
  value: string,
  index: number,
  array: string[]
) => boolean;

export type MergeFilter =
  | (() => MergeFilterPredicate)
  | (() => Excludes[])
  | boolean;

type MergeArg = string | Record<string, boolean>;

type MergeArgGroup = MergeArg | MergeArg[] | [...MergeArg[], MergeFilter];

type MergeArgs =
  | MergeArg[]
  | [...MergeArg[], MergeFilter]
  | [...MergeArgGroup[]]
  | [...MergeArgGroup[], MergeFilter];

/**
 * This method modifies the source array by removing the filter function
 */
const extractFilterIfPresent = (source: [...unknown[], MergeFilter]) => {
  const sourceType = typeof source[source.length - 1];
  const hasFilter = sourceType === 'function' || sourceType === 'boolean';

  if (!hasFilter) return null;

  const filterSource = source.pop() as MergeFilter;

  if (sourceType === 'boolean') return () => filterSource as boolean;

  const filterPredicate = (filterSource as Exclude<MergeFilter, boolean>)();
  const isSimpleExclusion = Array.isArray(filterPredicate);

  return isSimpleExclusion
    ? (value: string) => !filterPredicate.includes(value)
    : filterPredicate;
};

// [...(MergeArgGroup | [...MergeArgGroup[], MergeFilter])[], MergeFilter | MergeArgGroup]

export const merge = (...args: MergeArgs): string => {
  const processSegment = (
    source: MergeArg[] | [...MergeArgGroup[], MergeFilter]
  ): string[] => {
    const filter: MergeFilterPredicate = extractFilterIfPresent(
      source as [...unknown[], MergeFilter]
    );

    const { length } = source;
    const result: string[] = [];

    for (let index = 0; index < length; index++) {
      const item = source[index] as
        | MergeArgGroup
        | [...MergeArgGroup[], MergeFilter];

      if (!item) continue;
      if (typeof item === 'string') {
        result.push(item.trimEnd());

        continue;
      }

      const isAnObject = !Array.isArray(item) && typeof item === 'object';

      if (isAnObject) {
        for (const [key, value] of Object.entries(item)) {
          if (!value) continue;

          result.push(key.trimEnd());
        }

        continue;
      }

      result.push(...processSegment(item));
    }

    if (!filter) return result;

    return result.filter(filter);
  };

  const mainFilter = extractFilterIfPresent(
    args as [...unknown[], MergeFilter]
  );

  const classNames = [
    // remove duplicates
    ...new Set(
      processSegment(args as MergeArg[] | [...MergeArgGroup[], MergeFilter])
    ).values(),
  ];

  if (!mainFilter) return classNames.join(' ');

  return classNames.filter(mainFilter).join(' ');
};
