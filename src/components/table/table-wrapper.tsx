import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { TablePagination } from "./table-pagination";

export function TableWrapper({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  let paginationComponent: React.ReactNode;
  let tableData: React.ReactNode;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === TablePagination) {
        paginationComponent = child;
      }
      if (child.type === TableBody) {
        tableData = child;
      }
    }
  });
  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((head, i) => (
                <TableHead key={head ?? i}>{head}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {tableData}
        </Table>
      </div>
      {paginationComponent}
    </div>
  );
}
