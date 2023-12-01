import { SzerverAdat, datumIdoLabel } from "../models/paciensAdat";
import { useStorage } from "../store/AlapEljarasok";

export const DatumUzenetek = (datum: string | undefined | null) => {
  //console.log('Dátumot alakítod üzenetté:',datum)
  if (datum === null) {
    return null;
  }
  if (datum === undefined) {
    return undefined;
  }
  const d = new Date(datum);

  if (d.getFullYear() !== 1900) {
    //Ha a időpont T00:00:00.000+01:00
    //Nincs időpont1 1638313200000
    let time = d.toTimeString().slice(0, 8);
    //console.log('Nincs időpont1',time)
    if (time === "00:00:00") {
      //console.log('Nincs időpont2')
      return [datum];
    }
    return {
      key: datum,
      label: datumIdoLabel(d),
      uzenet: "Önnek már van előjegyzett időpontja",
    };
  }

  switch (d.getDate()) {
    case 1:
      // 1900-01-01
      return {
        key: datum,
        label: "",
        uzenet: "Frissítenie kell az új verzióra.",
      };
    case 2:
      // 1900-01-02
      return {
        key: datum,
        label: "",
        uzenet: "Nincs elérhető szabad időpont.",
      };
    case 3:
      // 1900-01-03
      return {
        key: datum,
        label: "",
        uzenet: "Elnézést, de ön le van tiltva.",
      };
  }
  //console.log(result)
  return null;
};

export const fetchUsernakUzenet = async (aktId: string) => {
  return "Sajnos a foglalások nem lehetségesek szabadság miatt!";
  // return "";
};

export const fetchListaKerdesek = async (aktId: string) => {
  //return [];
  return [
    {
      id: "1",
      question: "Köhög minden reggel?",
      status: false,
    },
    {
      id: "2",
      question: "Lázas?",
      status: false,
    },
    {
      id: "3",
      question: "Valami fertőző betegsége van?",
      status: false,
    },
  ];
};

export const fetchListaDate = async (aktId: string) => {
  return [
    { key: "2024-08-06T08:00:00.000+02:00" },
    { key: "2024-08-07T08:15:00.000+02:00" },
    { key: "2024-08-08T08:30:00.000+02:00" },
    { key: "2024-08-10T08:45:00.000+02:00" },
    { key: "2024-09-11T08:00:00.000+02:00" },
    { key: "2024-08-12T08:15:00.000+02:00" },
    { key: "2024-08-13T08:30:00.000+02:00" },
  ];
};

export const fetchListaIdo = async (aktId: string, datum: string) => {
  return [
    { key: "2021-08-06T08:00:00.000+02:00" },
    { key: "2021-08-07T08:15:00.000+02:00" },
    { key: "2021-08-08T08:30:00.000+02:00" },
    { key: "2021-08-10T08:45:00.000+02:00" },
    { key: "2021-08-11T09:00:00.000+02:00" },
  ];
};

export const fetchDatumLefoglalas = async (
  aktId: string,
  fogIdo: string,
  uzenet: string
) => {
  //Foglalásnál megelőztek 0 kapsz vissza
  return 11;
};

export async function fetchTaroltListaData() {
  const { olvasdAllQrCodot } = useStorage();
  let idLista = await olvasdAllQrCodot();
  //console.log(JSON.stringify(idLista,null,2))
  //value.concat(fakeDoctorlist)
  //setListData(fakeDoctorlist);
  if (idLista == null) return;

  /*
  Mát olvasás közben átalakítom
   idLista.map((x) => {
    x["fogIdopont"] = null;
    x["kozlemeny"] = null;
  }); */

  for (let index = 0; index < idLista.length; index++) {
    let element = idLista[index];
    //console.log("RESULT",element)
    if (element && element.id !== "") {
      let result = await fetchServerData(element.id);
      //console.log('RESULT', result);
      element.fogIdopont = result.fogIdopont;
      element.kozlemeny = result.kozlemeny;
    } else {
      element.fogIdopont = null;
      element.kozlemeny = null;
    }
  }
  //console.log("Szerver lekérdezése", idLista.length)
  //idLista.map((x) => console.log(x))
  return idLista;
}

const fetchServerData = async (id: string) => {
  //console.log('Value id:', id);
  let result: SzerverAdat = { fogIdopont: null, kozlemeny: null };
  let value = await fetchListaDate(id);
  //Ha tömböt kapok vissza nincs dátum időpontja
  if (Array.isArray(value)) {
    //console.log("idoAllapot value:",value)
    result.fogIdopont = null;
  } else {
    //Mindenkép frissíteni kell az előző nem maradhat
    //result.fogIdopont = {value};
  }
  //console.log("idoAllapot:",idoAllapot)
  let uzi = await fetchUsernakUzenet(id);
  if (uzi !== "") {
    result.kozlemeny = uzi;
  } else {
    //Mindenkép frissíteni kell az előző nem maradhat
    result.kozlemeny = null;
  }

  return result;
};
