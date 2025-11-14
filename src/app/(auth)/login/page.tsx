import { LoginForm } from "@/features/auth/components/login-from";
import {requireUnauth} from "@/lib/auth-utils";
import Link from "next/link";
import Image from "next/image"

const page = async  ()=>{
    await requireUnauth() 
    return (
        <div className="bg-muted flex min-h-svh flex-col justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-s flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center font-medium">
                    <Image src="/logo/logo.svg" alt="logo" width={30} height={30}/>

                </Link>
<LoginForm/>

            </div>
                 </div>
    )
};


export default page;

