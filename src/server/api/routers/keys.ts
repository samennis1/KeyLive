import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const keyRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const getKeys = await ctx.prisma.product.findMany({
      where: {
        user: {
          every: { id: ctx.session.user.id },
        },
      },
      select: {
        keys: true
      }
    });

    return getKeys;
  }),

  add: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const getProduct = await ctx.prisma.product.findFirst({
        where: {
          id: input.id,
          user: {
            every: { id: ctx.session.user.id },
          },
        },
      });

      if(getProduct) {
            ctx.prisma.productCode.create({
                data: {
                    key: Math.floor(Math.random() * 10000).toString(),
                    product: {
                        connect: {id: getProduct.id}
                    },
                    status: "available"
                }
            }).catch(e => {console.log(e)});
        } 
    }),
});
