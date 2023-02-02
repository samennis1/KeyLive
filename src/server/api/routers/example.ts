import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  goodbye: publicProcedure
    .input(z.object({text: z.string(), amount: z.number()}))
    .query(({input}) => {
      return {
        success: true,
        message: `Goodbye ${input.text}! You have ${input.amount} dollars left.`
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  checkBackend: publicProcedure.query(({ctx}): string => {
    const findUser = ctx.session?.user.name;
    return findUser || "--";
  })
});
