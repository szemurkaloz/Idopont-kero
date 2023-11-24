import React, { useState } from "react";
import {
  PaciensKartyaAdat,
  QrcodeAdat,
  getPaciensKartyaAdatFrom,
  FoglalasKeres,
} from "../models/paciensAdat";
import { useStorage } from "./AlapEljarasok";

const fakeDoctorlist = [
  {
    fogIdopont: {
      key: "2021-11-02T08:20:00.000+01:00",
      label: "",
      uzenet: "Nincs elérhető szabad időpont.",
    },
    id: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
    key: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
    kozlemeny: "",
    orvos: "Mónika PKPlus",
    paciensNev: "3 Év Alatti Gyermek",
    szerep: "orvos",
    szulDatum: "2018-01-31",
  },
  {
    fogIdopont: {
      key: "1900-01-02T00:00:00.000+01:00",
      label: "",
      uzenet: "Nincs elérhető szabad időpont.",
    },
    id: "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-3C1B5B34-D61A-44CA-96BD-64719D54F1AD",
    key: "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-3C1B5B34-D61A-44CA-96BD-64719D54F1AD",
    kozlemeny: "x",
    orvos: "Dr Főorvos Kiss Bogácsa Pál Bogárzó",
    paciensNev: "3 Év Alatti Gyermek",
    szerep: "orvos",
    szulDatum: "2018-01-31",
  },
  {
    fogIdopont: null,
    id: "9912-15ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-56AEABEF-666E-41AA-89E2-685290914354",
    key: "9912-15ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-56AEABEF-666E-41AA-89E2-685290914354",
    kozlemeny: "x",
    orvos: "Dr Valaki Nagy",
    paciensNev: "Remete Pál",
    szerep: "orvos",
    szulDatum: "2018-01-31",
  },
];

export type PaciensKartyaAdatContextType = {
  listData: PaciensKartyaAdat[];
  foglalasKeres: FoglalasKeres | null;
  editQrCard: (editCard: QrcodeAdat) => void;
  getAdatLista: () => void;
  setFoglalasKeresId: (id: string) => void;
  getFoglalasKeresId: () => Promise<string | undefined>;
};

export const GlobalContext =
  React.createContext<PaciensKartyaAdatContextType | null>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [listData, setListData] = useState<PaciensKartyaAdat[]>(fakeDoctorlist);
  const { taroldQrAdat, olvasdQrAdat } = useStorage();
  const [foglalasKeres, setFoglalasKeres] = useState<FoglalasKeres | null>(
    null
  );

  const getAdatLista = async () => {
    //Tárolóban frissíteni az adatot
    //taroldQrAdat(editCard);
  };

  const editQrCard = async (editCard: QrcodeAdat) => {
    //console.log("EDITCARD", editCard);
    //Tárolóban frissíteni az adatot
    taroldQrAdat(editCard);
    let result = await listData.find((a: QrcodeAdat) => a.id === editCard.id);
    if (result === undefined) {
      //Még nincs a listában
      setListData((old) => [...old, getPaciensKartyaAdatFrom(editCard)]);
    } else {
      result.cimke = editCard.cimke;
      /*
      setListData((prevLista) =>
        prevLista.map((card) => {
          //console.log("szerver fogidőpontok: ", allapot);
          return card.id === editCard.id
            ? {
                ...card,
                cimke: editCard.cimke,
              }
            : card;
        })
      );*/
    }
  };
  const setFoglalasKeresId = async (id: string) => {
    setFoglalasKeres({ id, key: "", label: "" });
  };

  const getFoglalasKeresId = async () => {
    return foglalasKeres?.id;
  };

  return (
    <GlobalContext.Provider
      value={{
        listData,
        editQrCard,
        getAdatLista,
        foglalasKeres,
        setFoglalasKeresId,
        getFoglalasKeresId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
