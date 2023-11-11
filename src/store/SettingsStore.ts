import { Store } from "pullstate";
import { QrcodeAdat } from "../models/paciensAdat";

const SettingsStore = new Store<QrcodeAdat[]>([
  {
    id: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
    key: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
    orvos: "Mónika PKPlus",
    paciensNev: "3 Év Alatti Gyermek",
    szerep: "orvos",
    szulDatum: "2018-01-31",
  },
]);

export default SettingsStore;

export const addItem = (item: QrcodeAdat) => {
  console.log(item);

  SettingsStore.update((s) => {
    let tempItems = [...s];
    const eredeti = tempItems.find((t) => t.id === item.id);

    console.log({ eredeti });

    if (eredeti !== undefined) {
      //Ha van eredeti azt kiemeljük
      tempItems = tempItems.filter((qrAdat) => qrAdat !== eredeti);
    }
    //Az újjat vagy a módosítottat hozzáadjuk
    tempItems.push({
      szerep: item.szerep,
      key: null,
      id: item.id,
      orvos: item.orvos,
      paciensNev: item.paciensNev,
      szulDatum: item.szulDatum,
    });

    s = tempItems;
  });
};
