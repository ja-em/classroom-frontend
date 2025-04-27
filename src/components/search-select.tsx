"use client";
import { useState } from "react";
import { ISelectItems } from "./ui/form-field/select-form-field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useQueryString } from "@/hooks/use-query-string";

export const SearchSelect = ({
  label,
  items,
  selectKey,
}: {
  label?: string;
  selectKey: string;
  items: ISelectItems;
}) => {
  const [selected, setSelected] = useState("");
  const { queryString } = useQueryString();

  return (
    <div className="grow">
      <Select
        value={selected}
        onValueChange={(v) => {
          setSelected(v);
          queryString({ [selectKey]: selected });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
