import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";
import KartyaAdatItem from "../components/KartyAdatItem/KartyaAdatItem";
import { cameraOutline } from "ionicons/icons";
import React, { useState } from "react";
import {
  GlobalContext,
  PaciensKartyaAdatContextType,
} from "../store/ListaContext";
import { PaciensKartyaAdat, QrcodeAdat } from "../models/paciensAdat";
import FelugroMenu from "../components/FelugroMenu";
import QrCodeElfogadPage from "./QrCodeElfogadPage";
import { useStorage } from "../store/AlapEljarasok";

type Props = {};

const DoktorListaPage: React.FC = () => {
  const { listData } = React.useContext(
    GlobalContext
  ) as PaciensKartyaAdatContextType;

  const { name } = useParams<{ name: string }>();

  type FelugroMenuHandle = React.ElementRef<typeof FelugroMenu>;

  const refFelugroMenu = React.useRef<FelugroMenuHandle>(null);

  const { torolAllQrAdat, taroldQrAdat, olvasdQrAdat, torolQrAdat } =
    useStorage();

  //e: React.MouseEvent<HTMLDivElement, MouseEvent>
  const KartyaClickHandle = async (adat: QrcodeAdat) => {
    //alert(JSON.stringify(adat, null, 2));
    refFelugroMenu.current?.start(adat);
  };

  const onSubmit = async () => {
    //Tárolóban frissíteni az adatot
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar">
          <IonButtons slot="secondary">
            <IonButton
              color="light-contrast"
              routerLink="/page/QrCodeBeolvasas"
            >
              <IonIcon slot="icon-only" icon={cameraOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-title ml-8">{name} Joci</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonButton onClick={() => onSubmit()}>Kezdeti adat</IonButton>
        {/*  <IonButton
          onClick={() => {
            refMegjelenit.current?.start();
          }}
        >
          Default
        </IonButton>
        <Figyelmeztetes2
          header="Hiba!"
          message={`Nem jó formátum!
Ellenőrizd, hogy a jó QR kódot olvasod-e be.`}
          ref={refMegjelenit}
        /> */}
        <ul id="open-action-sheet">
          {listData.map((item) => (
            <li
              key={item.id}
              className="flex-1 flex-col justify-normal mb-10"
              onClick={() => {
                KartyaClickHandle(item);
              }}
            >
              <KartyaAdatItem item={item} />
            </li>
          ))}
        </ul>
        <FelugroMenu ref={refFelugroMenu} />
      </IonContent>
    </IonPage>
  );
};

export default DoktorListaPage;
/* 
const onSubmit = async () => {
    //Tárolóban frissíteni az adatot
    const editCard = {
      id: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
      key: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
      orvos: "Mónika PKPlus",
      paciensNev: "3 Év Alatti Gyermek",
      szerep: "orvos",
      szulDatum: "2018-01-31",
    };

    taroldQrAdat(editCard);

    const editCard1 = {
      id: "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-3C1B5B34-D61A-44CA-96BD-64719D54F1AD",
      key: "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-3C1B5B34-D61A-44CA-96BD-64719D54F1AD",
      orvos: "Dr Főorvos Kiss Bogácsa Pál Bogárzó",
      paciensNev: "3 Év Alatti Gyermek",
      szerep: "orvos",
      szulDatum: "2018-01-31",
    };

    taroldQrAdat(editCard1);

    const editCard2 = {
      id: "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-56AEABEF-666E-41AA-89E2-685290914354",
      key: "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-56AEABEF-666E-41AA-89E2-685290914354",
      orvos: "Dr Valaki Nagy",
      paciensNev: "Remete Pál",
      szerep: "orvos",
      szulDatum: "2018-01-31",
    };

    taroldQrAdat(editCard2);

    //Beolvasás
    const dd = await olvasdQrAdat(
      "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5"
    );
    console.log("Mentett kulcs => KULCSOK:", JSON.stringify(dd, null, 2));

    //Beolvasás
    const dd1 = await olvasdQrAdat(
      "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-3C1B5B34-D61A-44CA-96BD-64719D54F1AD"
    );
    console.log("Mentett kulcs => KULCSOK:", JSON.stringify(dd1, null, 2));

    //Mindet törli
    //torolAllQrAdat();

    //Töröld
    /*torolQrAdat(
      "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-3C1B5B34-D61A-44CA-96BD-64719D54F1AD"
    );
  };
 */
