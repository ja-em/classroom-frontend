import { ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = (
  qs: Record<string, string>,
  oldParam?: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(oldParam?.toString());
  Object.keys(qs).forEach((key) => {
    const value = qs[key].toString();
    if (value && value.length > 0) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });
  return params.toString();
};
