import { Database, Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import { QrcodeAdat } from "../models/paciensAdat";

const [db, setDb] = useState<Database | null>(null);

useEffect(() => {
  async function initDb() {
    const store = new Storage();

    const db = await store.create();

    setDb(db);
  }

  initDb();
}, []);

export const taroldQrAdat = async (value: QrcodeAdat) => {
  try {
    const jsonkey = value.key;
    const jsonValue = JSON.stringify(value);
    await db.set(jsonkey, jsonValue);
  } catch (e) {
    //alert(`Tárolas közben hiba lépett fel: ${e}`);
    throw new Error(`Tárolas közben hiba lépett fel: ${e}`);
  }
};

export const olvasdQrAdat = async (key: string) => {
  try {
    const jsonValue = await db.get(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as QrcodeAdat) : null;
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(`Olvasás közben hiba lépett fel: ${e}`);
  }
};

export const torolQrAdat = async (key: string) => {
  try {
    await db.remove(key);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(`Törlés közben hiba lépett fel: ${e}`);
  }
};

export const olvasdAllKeys = async () => {
  try {
    return await db.keys();
  } catch (e) {
    throw new Error(`Kulcsok beolvasása közben hiba lépett fel: ${e}`);
  }
};

export const torolAllQrAdat = async () => {
  try {
    let tomb = await db.clear();
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(`Kulcsok törlése közben hiba lépett fel: ${e}`);
  }
};

export const olvasdAllQrCodot = async () => {
  try {
    const keys = await db.keys();
    if (keys === undefined) {
      return undefined;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};
