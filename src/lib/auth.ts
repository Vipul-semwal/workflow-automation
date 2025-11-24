import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {checkout, polar, portal} from "@polar-sh/better-auth"

import prisma from "../lib/database"

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),

    emailAndPassword:{
        enabled:true,
        autoSignIn: true,
    },
  });
