"use client";

import { createQueryString } from "@/lib/create-query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryString = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = useCallback(
    (qs: Parameters<typeof createQueryString>[0]) => {
      router.push(`?${createQueryString(qs, searchParams)}`);
    },
    [searchParams, router]
  );
  return { queryString };
};
