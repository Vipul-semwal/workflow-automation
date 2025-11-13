import { z } from 'zod';
import { proctectedProcedure , baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  hello:  proctectedProcedure 
    .input(
        z.object({ text: z.string() })
    )
    .query(({ctx,input}) => {
        console.log("userid:",ctx.auth.user.id)
      return {
        greeting: `hello ${input.text}, id:${ctx.auth.user.id}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
