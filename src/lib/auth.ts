import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@lib/database"

export const auth = betterAuth({
  //...
});
