import { z } from 'zod';

export const service = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  isPrimary: z.boolean(),
  unit: z.union([
    z.object({
      name: z.string().max(40),
      price: z.string(),
      duration: z.number().max(480)
    }),
    z.null()
  ])
});

export const services = z.array(service);

export type Service = z.infer<typeof service>;

export const primaryService = service.merge(
  z.object({
    isPrimary: z.literal(true)
  })
);

export const primaryServices = z.array(primaryService);

export type PrimaryService = z.infer<typeof primaryService>;

// const secondaryService = service.merge(
//   z.object({
//     isPrimary: z.literal(false)
//   })
// );

// export type SecondaryService = z.infer<typeof secondaryService>;
