import { getAllClassLevelAction } from "@/app/actions/student";
import { AddStudentForm } from "./add-student-form";

export const AddStudent = async () => {
  const classLevel = await getAllClassLevelAction();

  return (
    <div className="flex mb-2 justify-end">
      <AddStudentForm classLevelItems={classLevel} />
    </div>
  );
};
