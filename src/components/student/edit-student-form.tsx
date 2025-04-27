"use client";
import { useState } from "react";
import { DialogWrapper } from "../dialog-wrapper";
import { InputFormField } from "../ui/form-field/input-form-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createStudenSchema,
  ICreateStudenSchema,
} from "@/types/schema/student";
import { Form } from "../ui/form";
import { SelectFormField } from "../ui/form-field/select-form-field";
import { DateFormField } from "../ui/form-field/date-form-field";
import { IClassLevelObject, IStudentObject } from "@/types/interface/response";
import { updateStudentAction } from "@/actions/student";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

export const EditStudentForm = ({
  classLevelItems,
  student,
}: {
  classLevelItems: IClassLevelObject[];
  student: IStudentObject;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "all",
    resolver: zodResolver(createStudenSchema),
    defaultValues: {
      ...student,
      classLevelId: student.classLevelId.toString() as unknown as number,
      birthDate: new Date(student.birthDate),
    },
  });

  const onSubmit = async (value: ICreateStudenSchema) => {
    setLoading(true);
    const data = await updateStudentAction(student.id, value);
    setLoading(false);
    form.clearErrors();
    if (data.ok) {
      toast.success("Update Success");
      setOpen(false);
    } else {
      toast.error(data.error);
    }
  };
  return (
    <DialogWrapper
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          form.clearErrors();
        }
        setOpen(o);
      }}
      dialogTitle="แก้ไขนักเรียน"
      disabled={loading}
      triggerChildren={
        <Button size="icon-sm" className="rounded-full">
          <Pencil />
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <SelectFormField
              control={form.control}
              name="prefix"
              items={[
                {
                  label: "เด็กชาย",
                  value: "เด็กชาย",
                },
                {
                  label: "เด็กหญิง",
                  value: "เด็กหญิง",
                },
              ]}
              label="คำนำหน้าชื่อ"
            />
            <InputFormField
              control={form.control}
              name="firstName"
              label="ชื่อ"
            />
            <InputFormField
              control={form.control}
              name="lastName"
              label="นามสกุล"
            />
            <InputFormField
              control={form.control}
              name="identificationNumber"
              label="เลขบัตรประชาชน"
            />
            <SelectFormField
              control={form.control}
              name="gender"
              items={[
                {
                  label: "ชาย",
                  value: "ชาย",
                },
                {
                  label: "หญิง",
                  value: "หญิง",
                },
              ]}
              label="เพศ"
            />
            <DateFormField control={form.control} name="birthDate" />
            <SelectFormField
              control={form.control}
              name="classLevelId"
              items={classLevelItems.map((item) => ({
                label: item.name,
                value: item.id.toString(),
              }))}
              label="ระดับชั้น"
            />
          </div>
          <DialogWrapper.Footer
            onOpenChange={(o) => {
              if (!o) {
                form.clearErrors();
              }
              setOpen(o);
            }}
            disabled={loading}
          />
        </form>
      </Form>
    </DialogWrapper>
  );
};
