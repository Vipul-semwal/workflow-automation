"use client"

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
// import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const loginSchema = z.object(
    {
        email:z.email("please enter a valid email address!"),
        password:z.string().min(8,"password is requried"),
    }
);

type loginFormValues = z.infer<typeof loginSchema>;

export function LoginForm(){
    const router = useRouter();
     
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting,isDirty},
        setError,
        reset,

    } = useForm<loginFormValues>({
         resolver:zodResolver(loginSchema),
         defaultValues:{email:"",password:""},
         mode:"onSubmit",
    });

    const onSubmit = async(value:loginFormValues)=>{
        console.log("values:",value)
    }


    return (
        <div className="flex flex-col gap-6">


        </div>
    )




}
