"use client"

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menueItems = [
    {
        title:"Workflows",
        items:[
            {
                title:"Workflows",
                icon:FolderOpenIcon,
                url:"/workflows",
            }
        ]
    }
]


export const AppsideBar = ()=>{
    return (
        <Sidebar collapsible="icon">
        <SidebarContent>
            {
                menueItems.map((group)=>{
                    <SidebarGroup key={group.title}>
                    <SidebarGroupContent>
                    {group.items.map((item)=>{
                        return (
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} isActive={false} asChild className="gap-x-4 h-10 px-4">
                            <Link href={item.url} prefetch>
                                <item.icon className="size-4"/>
                                <span>
                                {item.title}
                                </span>

                            </Link>
                            

                            </SidebarMenuButton>


                            </SidebarMenuItem>
                        )
                        


                    })}
                     
                    </SidebarGroupContent>
                    
                    </SidebarGroup>
            })
            }

        </SidebarContent>
            
        </Sidebar>
    )
}
