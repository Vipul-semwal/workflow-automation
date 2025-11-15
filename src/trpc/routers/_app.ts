import { z } from 'zod';
import {inngest} from "@/inngest/client";
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
    createWorkFlow:proctectedProcedure.mutation(async()=>{
        console.log('lode lag gya')
        await inngest.send({
            name:"test/hello.world",
            data:{
                email:"vipulSemwal124@gmail.com"
            }
        });
        return {
            data:[]
        }

    })
    ,
getWorkflows: proctectedProcedure.query(async ({ ctx }) => {
  return [{ id: 1, name: "Test workflow" }];
}),

});
// export type definition of API
export type AppRouter = typeof appRouter;
