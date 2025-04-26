import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";

export function InputFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
}: Readonly<{ control: Control<TFieldValues>; name: TName; label?: string }>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            <FormLabel>{label ?? name}</FormLabel>
            <FormControl>
              <Input placeholder={label ?? name} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
