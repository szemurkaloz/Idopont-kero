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

type Cimke = {
  cimke?: string;
};

// extract the inferred type
export type PaciensXmlKartyaAdat = z.infer<typeof paciensKartyaAdat>;

export type PaciensKartyaAdat = PaciensXmlKartyaAdat & Cimke;

export type QrcodeAdat = Omit<PaciensKartyaAdat, "fogIdopont" | "kozlemeny">;

export type FoglalasKeres = {
  id: string;
  key: string;
};

//"9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-232DF607-8D46-446D-A783-4C1F8B61D3EA#Alma Beáta#2000-01-01#Kovács József#orvos"
export const VonalkodHiteles = (adat: string): boolean => {
  const patt =
    "^[0-9]{4}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}#.+$";

  if (!adat.match(patt)) return false;
  else return true;
};

export const getDataFromScan = (adat: string): QrcodeAdat => {
  const scannedData = adat.split("#");
  return {
    key: null,
    id: scannedData[0],
    paciensNev: scannedData[1],
    szulDatum: scannedData[2],
    orvos: scannedData[3],
    szerep: scannedData[4],
  };
};

export const getPaciensKartyaAdatFrom = (adat: QrcodeAdat) => {
  const result: PaciensKartyaAdat = adat as PaciensKartyaAdat;
  result.fogIdopont = null;
  result.kozlemeny = null;
  return result;
};

export function datumIdoLabel(datum: string) {
  //kezdet:"2021-08-06T08:00:00.000+02:00"
  //eredmény:"2021.08.06. 8:00"
  const currentDate = new Date(datum);
  let tomb = currentDate
    .toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    })
    .split(" ");
  tomb[3] = " " + tomb[3];
  return tomb.join("");
}

export function datumLabel(datum: string) {
  //kezdet:"2021-08-06T08:00:00.000+02:00"
  //eredmény:"2021.08.06."
  /* 
  //eredmény:"2021. 08. 06."
  return currentDate.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });*/
  const currentDate = new Date(datum);
  //eredmény:"2021.08.06."
  return currentDate
    .toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(" ")
    .join("");
}

export function idoLabel(datum: string) {
  const currentDate = new Date(datum);
  return currentDate.toLocaleTimeString("hu-HU", {
    hour: "numeric",
    minute: "2-digit",
  });
}
//Date.prototype.toISOString always returns ####-##-##T##:##:##.###<timezone>,
//                                          "2021-08-06T08:00:00.000+02:00";
