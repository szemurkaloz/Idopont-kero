import { expect, test } from "vitest";
// #region example
import { z } from "zod";
import { createFixture } from "zod-fixture";
import {
  getDataFromScan,
  paciensKartyaAdat,
  VonalkodHiteles,
} from "./paciensAdat";

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
  expect(adat).toMatchObject(`
    {
      "fogIdopont": null,
      "id": "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
      "key": "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
      "kozlemeny": undefined,
      "orvos": "wgnzehjylylrr-n",
      "paciensNev": "mrkzguocgcuahzn",
      "szerep": undefined,
      "szulDatum": "svypytybbdyyf-x",
    }
  `);
});

test("Beolvasott qrcode minta ellenörzése", () => {
  const joAdat =
    "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-232DF607-8D46-446D-A783-4C1F8B61D3EA#Alma Beáta#2000-01-01#Kovács József#orvos";
  const result = VonalkodHiteles(joAdat);
  expect(result).toEqual(true);
});

test("Beolvasott qrcode-ból object", () => {
  const adat =
    "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-232DF607-8D46-446D-A783-4C1F8B61D3EA#Alma Beáta#2000-01-01#Kovács József#orvos";
  const result = getDataFromScan(adat);
  expect(result).toEqual({
    key: null,
    id: "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-232DF607-8D46-446D-A783-4C1F8B61D3EA",
    paciensNev: "Alma Beáta",
    szulDatum: "2000-01-01",
    orvos: "Kovács József",
    szerep: "orvos",
    fogIdopont: null,
    kozlemeny: null,
  });
});
