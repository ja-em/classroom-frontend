"use client";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { DialogWrapper } from "../dialog-wrapper";
import { useState } from "react";
import { toast } from "react-toastify";
import { IStudentObject } from "@/types/interface/response";
import { deleteStudentAction } from "@/actions/student";

export const DeleteStudentForm = ({ student }: { student: IStudentObject }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const data = await deleteStudentAction(student.id);
    setLoading(false);
    if (data.ok) {
      toast.success("Delete Success");
      setOpen(false);
    } else {
      toast.error(data.error);
    }
  };
  return (
    <DialogWrapper
      open={open}
      onOpenChange={(o) => setOpen(o)}
      dialogTitle={`ยืนยันการลบนักเรียน ${student.firstName} ${student.lastName}`}
      disabled={loading}
      triggerChildren={
        <Button size="icon-sm" className="rounded-full" variant={"destructive"}>
          <Trash />
        </Button>
      }
    >
      <DialogWrapper.Footer
        onOpenChange={(o) => setOpen(o)}
        disabled={loading}
        onConfirm={onSubmit}
      />
    </DialogWrapper>
  );
};
