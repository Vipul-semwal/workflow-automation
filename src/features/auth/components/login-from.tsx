"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {authClient} from "@/lib/auth-client"

// ✅ Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(8, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export  function LoginForm() {
  const router = useRouter();

  // ✅ Keep full form object
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  // ✅ Just grab isSubmitting separately
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: LoginFormValues) => {
      await authClient.signIn.email({email:values.email,password:values.password,callbackURL:"/"},{
          onSuccess:()=> { 
              router.push("/")
          },
          onError:(ctx)=>{
           toast.error(ctx.error.messsage)
          }
      })
    toast.success("Form submitted!");
  };

  return (
    <div className="flex  flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login to Continue</CardDescription>
        </CardHeader>

        <CardContent>
          {/* ✅ Pass the full form object */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isSubmitting}
                  >
                    Continue with Google
                  </Button>
                </div>
                  <div className="grid gap-6">
                     <FormField
  control={form.control}
  name="email"
  render={({ field }) => {
    return (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="m@gmail.com" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>
<FormField
  control={form.control}
  name="password"
  render={({ field }) => {
    return (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="password" placeholder="********" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                          Login 
                    </Button>
               
                </div>
                  <div className="text-center text-sm">
                      Don't have an account?
                      <Link href="/signup"
                      className="underline underline-offset-4">
                          Sign Up
                    </Link>

                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

