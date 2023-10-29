import { z } from "zod";
//datetime.parse("2020-01-01T00:00:00+02:00");
//iso dátumot is elfogadja ekkor
//z.string().datetime({ offset: true})

export const paciensKartyaAdat = z.object({
  fogIdopont: z.nullable(
    z.object({
      key: z.string().datetime({ offset: true }),
      label: z.string().default(""),
      uzenet: z.string().default(""),
    })
  ),
  id: z
    .string()
    .refine(
      (value) =>
        /^[0-9]{4}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}#.+$/.test(
          value
        ),
      "Az id azonosítónak nem megfelelő a formátuma."
    ),
  key: z.string(),
  kozlemeny: z.string().nullish(),
  orvos: z.string(),
  paciensNev: z.string(),
  szerep: z.string().optional(),
  szulDatum: z.string(),
});

// extract the inferred type
export type PaciensKartyaAdat = z.infer<typeof paciensKartyaAdat>;
