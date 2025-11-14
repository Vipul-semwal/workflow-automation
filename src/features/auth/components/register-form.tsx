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
import {authClient} from "@/lib/auth-client";

// Γ£à Schema
const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(8, "Password is required"),
  confirmPassword:z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  // Γ£à Keep full form object
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "",confirmPassword:"" },
    mode: "onSubmit",
  });

  // Γ£à Just grab isSubmitting separately
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: RegisterFormValues) => {
    console.log("values coe:", values);
    const data = await authClient.signUp.email({
        name:values.email,
        email:values.email,
        password:values.password,
        callbackURL:"/"
    },
  {
    onSuccess:()=>{
        router.push("/login");
    },
    onError:(error)=>{
        toast.error(error.error.message);
    }

  }
  )
  console.log("data:", data);
    toast.success("Form submitted!");
  };

  return (
    <div className="flex  flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription> Sign up to Create an account</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Γ£à Pass the full form object */}
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
 <Image src="/logo/google.svg" width={20} height={20} alt={"google logo"}/>

                    Continue with Google
                  </Button>
                </div>

 <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isSubmitting}
                  >
 <Image src="/logo/github.svg" width={20} height={20} alt={"github logo"}/>

                    Continue with Git Hub
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
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="********" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>
<FormField
  control={form.control}
  name="confirmPassword"
  render={({ field }) => {
    return (
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="********" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>



                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                          Register 
                    </Button>
               
                </div>
                  <div className="text-center text-sm">
                      Already have an account?
                      <Link href="/login"
                      className="underline underline-offset-4">
                          Sign In
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


