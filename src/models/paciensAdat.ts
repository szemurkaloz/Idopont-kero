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
  key: z.string().nullable(),
  kozlemeny: z.string().nullable(),
  orvos: z.string(),
  paciensNev: z.string(),
  szerep: z.string().optional(),
  szulDatum: z.string(),
});

// extract the inferred type
export type PaciensKartyaAdat = z.infer<typeof paciensKartyaAdat>;

export type QrcodeAdat = Omit<PaciensKartyaAdat, "fogIdopont" | "kozlemeny">;

//"9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-232DF607-8D46-446D-A783-4C1F8B61D3EA#Alma Beáta#2000-01-01#Kovács József#orvos"
export const VonalkodHiteles = (adat: string): boolean => {
  const patt =
    "^[0-9]{4}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}#.+$";

  if (!adat.match(patt)) return false;
  else return true;
};

export const getDataFromScan = (adat: string): PaciensKartyaAdat => {
  const scannedData = adat.split("#");
  return {
    key: null,
    id: scannedData[0],
    paciensNev: scannedData[1],
    szulDatum: scannedData[2],
    orvos: scannedData[3],
    szerep: scannedData[4],
    fogIdopont: null,
    kozlemeny: null,
  };
};
