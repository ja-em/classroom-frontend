export type IFieldErrors<T> =
  | {
      [K in keyof T]: string[] | undefined;
    }
  | undefined;

export type IActionState<TInput, TOutput> = {
  fieldErrors?: IFieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export type IAction<TInput, TOutput> = (
  data: TInput
) => Promise<IActionState<TInput, TOutput>>;

export interface IUseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}
