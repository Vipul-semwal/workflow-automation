"use client"
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';
import { ClientGreeting } from './client';
import {requireAuth} from "@/lib/auth-utils"
import { caller  } from "@/trpc/server";
import Logout from "./logout"
import {useQuery, useMutation} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";
import {Button} from "@/components/ui/button"
 
 
export default  function Home() {
 const trpc = useTRPC()
    const {data} = useQuery(trpc.getWorkflows.queryOptions());
    const create = useMutation(trpc.createWorkFlow.mutationOptions())
   

     
  return (
       <div className='flex min-h-screen min-w-screen justify-center  flex items-center'>
        <h1>Protected Route</h1>
           {JSON.stringify(data)}
           <Logout/>
           <Button disabled={create.isPending}  onClick={()=>{
           create.mutate()
           }}></Button>
         </div>
  );
}

