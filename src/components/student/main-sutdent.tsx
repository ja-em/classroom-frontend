import { getAllClassLevelAction, getAllStudentAction } from "@/actions/student";
import { IPaginationRequest } from "@/types/interface/request";
import { TableWrapper } from "../table/table-wrapper";
import { TablePagination } from "../table/table-pagination";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { LoaderIcon } from "lucide-react";
import { AddStudentForm } from "./add-student-form";
import { EditStudentForm } from "./edit-student-form";
import { DeleteStudentForm } from "./delete-student";
import { SearchSelect } from "../search-select";
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
export async function MainStudent({
  page,
  keyword,
  classLevelId,
}: IPaginationRequest & { classLevelId: string }) {
  const [{ items, ...pagi }, classLevel] = await Promise.all([
    getAllStudentAction({
      page: page ? +page : 1,
      keyword,
      classLevelId: +classLevelId,
    }),
    getAllClassLevelAction(),
  ]);

  return (
    <div>
      <div className="flex mb-2 justify-between ">
        <SearchSelect
          items={classLevel.map((v) => ({
            value: v.id.toString(),
            label: v.name,
          }))}
          selectKey="classLevelId"
          label="ระดับชั้น"
        />
        <AddStudentForm classLevelItems={classLevel} />
      </div>
      <TableWrapper headers={headers}>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="odd:bg-muted/50">
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.identificationNumber}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.birthDate.toString().split("T")[0]}</TableCell>
              <TableCell>{item.classLevel?.name}</TableCell>
              <TableCell className="flex justify-center space-x-1">
                <EditStudentForm classLevelItems={classLevel} student={item} />
                <DeleteStudentForm student={item} />
              </TableCell>
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
