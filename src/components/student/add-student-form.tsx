"use client";
import { useState } from "react";
import { DialogWrapper } from "../dialog-wrapper";
import { InputFormField } from "../ui/form-field/input-form-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudenSchema } from "@/types/schema/student";
import { Form } from "../ui/form";
import { SelectFormField } from "../ui/form-field/select-form-field";
import { DateFormField } from "../ui/form-field/date-form-field";
import { IClassLevelObject } from "@/types/interface/response";

export const AddStudentForm = ({
  classLevelItems,
}: {
  classLevelItems: IClassLevelObject[];
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    mode: "all",
    resolver: zodResolver(createStudenSchema),
    defaultValues: {},
  });
  return (
    <DialogWrapper
      open={open}
      onOpenChange={(o) => setOpen(o)}
      dialogTitle="เพิ่มนักเรียน"
      addLabel="เพิ่มนักเรียน"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
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
                  label: "เด็กชาย",
                  value: "เด็กหญิง",
                },
              ]}
            />
            <InputFormField control={form.control} name="firstname" />
            <InputFormField control={form.control} name="lastname" />
            <SelectFormField
              control={form.control}
              name="gender"
              items={[
                {
                  label: "ชาย",
                  value: "ชาย",
                },
                {
                  label: "ชาย",
                  value: "หญิง",
                },
              ]}
            />
            <DateFormField control={form.control} name="birthDate" />
            <SelectFormField
              control={form.control}
              name="classLevelId"
              items={classLevelItems.map((item) => ({
                label: item.name,
                value: item.id.toString(),
              }))}
            />
          </div>
          <DialogWrapper.Footer onOpenChange={(o) => setOpen(o)} />
        </form>
      </Form>
    </DialogWrapper>
  );
};
