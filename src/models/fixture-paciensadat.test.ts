import { expect, test } from "vitest";
// #region example
import { z } from "zod";
import { createFixture } from "zod-fixture";
import { paciensKartyaAdat } from "./paciensAdat";

const adat = createFixture(paciensKartyaAdat);

const output = Object.assign({
  fogIdopont: {
    key: "2021-11-02T08:20:00.000+01:00",
    label: "",
    uzenet: "Nincs elérhető szabad időpont.",
  },
  id: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
  key: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
  kozlemeny: undefined,
  orvos: "Mónika PKPlus",
  paciensNev: "3 Év Alatti Gyermek",
  szerep: "orvos",
  szulDatum: "2018-01-31",
});

test("Kijövő páciens kártya adat ellenőrzése", () => {
  expect(adat).toMatchInlineSnapshot(`{
  fogIdopont: {
    key: "2021-11-02T08:20:00.000+01:00",
    label: "",
    uzenet: "Nincs elérhető szabad időpont.",
  },
  id: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
  key: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
  kozlemeny: undefined,
  orvos: "Mónika PKPlus",
  paciensNev: "3 Év Alatti Gyermek",
  szerep: "orvos",
  szulDatum: "2018-01-31",
}`);
});
