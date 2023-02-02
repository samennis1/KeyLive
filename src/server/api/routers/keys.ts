import { z } from "zod";
import { productCodeExtension } from "../../../utils/types";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const keyRouter = createTRPCRouter({
  getAll: protectedProcedure
  .input(z.object({max: z.number()}).nullish())
  .query(async ({ ctx, input }): Promise<productCodeExtension[]> => {
    const max = input?.max ?? undefined;

    const getKeys = await ctx.prisma.product.findMany({
      where: {
        user: {
          every: { id: ctx.session.user.id },
        },
      },
      select: {
        keys: {
          include: {
            product: true
          }
        },
      },
      take: max
    });

    const mapped = getKeys
      .filter((f) => f.keys.length)
      .map((a) => a.keys)
      .reduce((p, n) => {
        return p.concat(n);
      })
      .sort((prev, next) => {
        const {createdTime: prevTime} : Date = prev;
        const {createdTime : nextTime} : Date = next;
        return (prevTime.getTime() - nextTime.getTime())
      })

    return mapped;
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

      if (getProduct) {
        ctx.prisma.productCode
          .create({
            data: {
              key: Math.floor(Math.random() * 10000).toString(),
              product: {
                connect: { id: getProduct.id },
              },
              status: "available",
            },
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }),
});
