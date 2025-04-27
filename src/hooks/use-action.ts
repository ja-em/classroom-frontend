import {
  IAction,
  IFieldErrors,
  IUseActionOptions,
} from "@/types/interface/action";
import { useCallback, useState } from "react";

export const useAction = <TInput, TOutput>(
  action: IAction<TInput, TOutput>,
  options: IUseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    IFieldErrors<TInput> | undefined
  >(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) return;

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }
        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
