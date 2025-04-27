import { getAllStudent } from "@/app/actions/student";
import { IPaginationRequest } from "@/types/interface/request";
import { TableWrapper } from "../table/table-wrapper";
import { TablePagination } from "../table/table-pagination";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { LoaderIcon } from "lucide-react";

import { AddStudent } from "./add-student";
const headers = [
  "ID",
  "ชื่อ",
  "นามสกุล",
  "รหัสบัตรประชาชน",
  "เพศ",
  "วันเกิด",
  "ระดับชั้น",
  "",
];
export async function MainStudent({ page }: IPaginationRequest) {
  const { items, ...pagi } = await getAllStudent({ page: page ? +page : 1 });

  return (
    <div>
      <AddStudent />
      <TableWrapper headers={headers}>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="odd:bg-muted/50">
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.identificationNumber}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.birthDate.toString()}</TableCell>
              <TableCell>{item.classLevel?.name}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination pagination={pagi} />
      </TableWrapper>
    </div>
  );
}

MainStudent.Loading = function Loading() {
  return (
    <TableWrapper headers={headers}>
      <TableBody>
        <TableRow className="odd:bg-muted/50">
          <TableCell colSpan={8} align="center">
            <LoaderIcon className="animate-spin h-10 w-10" />
          </TableCell>
        </TableRow>
      </TableBody>
    </TableWrapper>
  );
};
