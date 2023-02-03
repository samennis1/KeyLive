import { Product } from "@prisma/client";
import { z } from "zod";
import { productExtension, reqResponse } from "../../../utils/types";
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

    getAll: protectedProcedure
    .query(async ({ctx}): Promise<productExtension[]> => {
      const getProducts = await ctx.prisma.product.findMany({
        where: {
          user: {
            every: {id: ctx.session.user.id} 
          },
        },
        include: {
          user: true,
          keys: true
        }
      })

      return getProducts;
    }),

    getOne: protectedProcedure
    .input(z.object({product_id: z.string()}))
    .query(async ({ctx, input}): Promise<productExtension | null> => {
      const product_id = input?.product_id;

      const getProducts = await ctx.prisma.product.findFirst({
        where: {
          user: {
            every: {id: ctx.session.user.id} 
          },
          id: product_id
        },
        include: {
          user: true,
          keys: true
        }
      })

      return getProducts;
    }),
});
