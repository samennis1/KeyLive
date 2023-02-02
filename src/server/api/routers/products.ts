import { Product } from "@prisma/client";
import { z } from "zod";
import { reqResponse } from "../../../utils/types";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      await ctx.prisma.product.create({
        data: {
            name: input.name,
            user: {
              connect: [{id: ctx.session.user.id}],
            },
        }
      });

      return {
        success: true,
        data: {},
      };
    }),

    get: protectedProcedure
    .query(async ({ctx})=> {
      const getProducts = await ctx.prisma.product.findMany({
        where: {
          user: {
            every: {id: ctx.session.user.id} 
          }
        },
        include: {
          user: true
        }
      })

      return getProducts;
    })
});
