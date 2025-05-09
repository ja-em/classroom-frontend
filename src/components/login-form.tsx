"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { School } from "lucide-react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginSchema, loginSchema } from "@/types/schema/login";
import { InputFormField } from "./ui/form-field/input-form-field";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MenuLinkEnum } from "@/constants/menu";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";

export function LoginForm() {
  const loginForm = useForm({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: ILoginSchema) => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    setLoading(false);
    if (res?.ok) {
      toast.success("Login success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push(MenuLinkEnum.CLASSROOM);
      return;
    }
    toast.error(res?.error?.split(":")[0], {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...loginForm}>
            <form
              className="p-6 md:p-8"
              onSubmit={loginForm.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Hello World!</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your admin account
                  </p>
                </div>
                <div className="grid gap-3">
                  <InputFormField control={loginForm.control} name="username" />
                </div>
                <div className="grid gap-3">
                  <InputFormField control={loginForm.control} name="password" />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <School
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              strokeWidth={1}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
