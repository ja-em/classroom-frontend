import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School } from "lucide-react";

export function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Hello World!</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your admin account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">username</Label>
                <Input type="text" placeholder="admin" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
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
