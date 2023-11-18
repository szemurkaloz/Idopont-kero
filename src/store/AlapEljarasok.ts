import { Database, Drivers, Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import { QrcodeAdat } from "../models/paciensAdat";

export const useStorage = () => {
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    async function initDb() {
      const newStore = new Storage({
        /* Alkalmazás/Helyi tárhely  */
        name: "qrcode-db",
        driverOrder: [Drivers.LocalStorage],
      });

      const db = await newStore.create();

      setDb(db);
    }

    initDb();
  }, []);

  const taroldQrAdat = async (value: QrcodeAdat) => {
    try {
      const jsonkey = value.id;
      const jsonValue = JSON.stringify(value);
      await db.set(jsonkey, jsonValue);
    } catch (e) {
      //alert(`Tárolas közben hiba lépett fel: ${e}`);
      throw new Error(`Tárolas közben hiba lépett fel: ${e}`);
    }
  };

  const olvasdQrAdat = async (id: string) => {
    try {
      const jsonValue = await db.get(id);
      return jsonValue != null ? (JSON.parse(jsonValue) as QrcodeAdat) : null;
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(`Olvasás közben hiba lépett fel: ${e}`);
    }
  };
  const torolQrAdat = async (id: string) => {
    try {
      await db.remove(id);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(`Törlés közben hiba lépett fel: ${e}`);
    }
  };

  const torolAllQrAdat = async () => {
    try {
      let tomb = await db.clear();
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(`Kulcsok törlése közben hiba lépett fel: ${e}`);
    }
  };

  /* több ebben a változatban nincs
  const keresKeyInKeys = async (id: string): Promise<boolean> => {
    try {
      console.log(`Belső keresés:${JSON.stringify(db.keys())}`);
      let tomb = await db.keys();
      return tomb.find((x: string) => {
        if (x === id) {
          return true;
        }
        return false;
      });
    } catch (e) {
      throw new Error(`Kulcsok beolvasása közben hiba lépett fel: ${e}`);
    }
  };

  const olvasdAllKeys = async (): Promise<string[]> => {
    try {
      console.log(JSON.stringify(db.keys()));
      return await db.keys();
    } catch (e) {
      throw new Error(`Kulcsok beolvasása közben hiba lépett fel: ${e}`);
    }
  };

  const olvasdAllQrCodot = async () => {
    try {
      const keys = await db.keys();
      if (keys === undefined) {
        return undefined;
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
  */

  return {
    taroldQrAdat,
    olvasdQrAdat,
    torolQrAdat,
    torolAllQrAdat,
  };
};
