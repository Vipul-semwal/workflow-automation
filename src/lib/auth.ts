import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {checkout, polar, portal} from "@polar-sh/better-auth"
import {polarClient} from "./polar"

import prisma from "../lib/database"

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),

    emailAndPassword:{
        enabled:true,
        autoSignIn: true,
    },
    plugins:[
        polar({
            client:polarClient,
            createCustomerOnSignUp:true,
            use:[
                checkout({
                    products:[
                        {
                            productId:"929014b3-426a-4ffe-8a16-51ac99eb0f6e",
                            slug:"pro"
                        }
                    ],
                    successUrl:process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly:true,
                }),
                portal(),
            ]
        })
    ]
  });
