import { useMemo } from "react";

export const usePropsGroup = <T extends Record<string, unknown>>(object: T) => {
  const deps = Object.values(object);

  return useMemo(() => object, deps);
};
