"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useQueryString } from "@/hooks/use-query-string";

export const SearchKeyword = () => {
  const { queryString } = useQueryString();
  const [keyword, setKeyword] = useState("");
  return (
    <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
      <Search className="h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="ค้นหา"
        className="border-0 focus-visible:ring-0 shadow-none h-8"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            queryString({
              keyword,
              page: "1",
            });
          }
        }}
      />
    </div>
  );
};
