import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';
import { ClientGreeting } from './client';
import {requireAuth} from "@/lib/auth-utils"
import { caller  } from "@/trpc/server";

export default async  function Home() {
    await requireAuth();

    const data = await caller.hello({text:"vipul sarkar"})
  
  return (
       <div className='flex min-h-screen min-w-screen justify-center  flex items-center'>
        <h1>Protected Route</h1>
           {JSON.stringify(data)}
         </div>
  );
}
