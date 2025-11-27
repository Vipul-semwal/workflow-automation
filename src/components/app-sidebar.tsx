"use client";

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
import { useRouter, usePathname  } from "next/navigation";
import {authClient} from "@/lib/auth-client";
import {useHasActiveSubscriptions } from "@/features/subscription/hooks/use-subscriptions";

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
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
{
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
{
        title: "Excution",
        icon: HistoryIcon,
        url: "/excution",
      },


    ],
  },
];

export const AppSidebar = () => {
     const pathname = usePathname();
     const router = useRouter();
     const {
 hasActiveSubscription,
      subscription,
      isLoading,
      ...rest
     } = useHasActiveSubscriptions();

  return (
    <Sidebar collapsible="icon">
    <SidebarHeader>
        <SidebarMenuItem>
        <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/Workflows" prefetch>
 <Image src="/logo/logo.svg" alt="logo" width={30} height={30} />

                             <span className="font-semibold text-sm">Vip Las</span>
            </Link>
            

        </SidebarMenuButton>
        </SidebarMenuItem>
     </SidebarHeader>
      <SidebarContent>
        {menueItems.map((group) => {
          return (
            <SidebarGroup key={group.title}>
              <SidebarGroupContent>
            <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon; // good pattern

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                          isActive={
                              item.url === "/" ? pathname == "/" : pathname.startsWith(item.url)
                          }
                        asChild
                        className="gap-x-4 h-10 px-4"
                      >
                        <Link href={item.url} prefetch={true}>
                          <Icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>

              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
        <SidebarFooter>
        <SidebarMenu>
        <SidebarMenuItem>
           {!hasActiveSubscription && !isLoading && (
  <SidebarMenuButton
    tooltip="Upgrade to pro"
    className="gap-x-4 h-10 px-4"
    onClick={() => {
      authClient.checkout({
        slug: "pro",
      });
    }}
  >
    <StarIcon className="h-4 w-4" />
    <span>Upgrade to Pro</span>
  </SidebarMenuButton>
)}

        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton tooltip="Billing Portal" className="gap-x-4 h-10 px-4" onClick={()=>{
                authClient.customer.portal()
                
                }}>
                <CreditCardIcon className="h-4 w-4" />
                <span> Billing Portal </span>
            
            

        </SidebarMenuButton>

        </SidebarMenuItem>

         <SidebarMenuItem>
            <SidebarMenuButton tooltip="Log out" className="gap-x-4 h-10 px-4" onClick={()=>{
                authClient.signOut({
                    fetchOptions:{
                        onSuccess:()=>{
                            router.push("/")
                        }
                    }
                }) 
                
                }}>
                <LogOutIcon className="h-4 w-4" />
                <span> Sign Out  </span>
            
            

        </SidebarMenuButton>

        </SidebarMenuItem>





        </SidebarMenu>

        </SidebarFooter>
    </Sidebar>
  );
};

