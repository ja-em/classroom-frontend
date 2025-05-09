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
import { IClassLevelObject } from "@/types/interface/response";
import { createStudentAction } from "@/actions/student";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

export const AddStudentForm = ({
  classLevelItems,
}: {
  classLevelItems: IClassLevelObject[];
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "all",
    resolver: zodResolver(createStudenSchema),
    defaultValues: {},
  });

  const onSubmit = async (value: ICreateStudenSchema) => {
    setLoading(true);
    const data = await createStudentAction(value);
    setLoading(false);
    if (data.ok) {
      toast.success("Create Success");
      setOpen(false);
      form.reset();
    } else {
      toast.error(data.error);
    }
  };
  return (
    <DialogWrapper
      open={open}
      onOpenChange={(o) => setOpen(o)}
      dialogTitle="เพิ่มนักเรียน"
      disabled={loading}
      triggerChildren={<Button>เพิ่มนักเรียน</Button>}
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
            onOpenChange={(o) => setOpen(o)}
            disabled={loading}
          />
        </form>
      </Form>
    </DialogWrapper>
  );
};
