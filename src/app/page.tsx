"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Home() {
    const trpc = useTRPC();
    const { data: users } = useQuery(trpc.hello.queryOptions({ text: "bro" }));

    console.log('data:', users);

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
            {JSON.stringify(users)}
        </div>
    );
}

