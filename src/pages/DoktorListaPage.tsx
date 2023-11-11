import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Route, useParams } from "react-router";
import "./Page.css";
import KartyaAdatItem from "../components/KartyAdatItem/KartyaAdatItem";
import { cameraOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Figyelmeztetes2 } from "../components/CameraModul/Figyelmeztetes";
import {
  GlobalContext,
  PaciensKartyaAdatContextType,
} from "../store/ListaContext";
import { PaciensKartyaAdat, QrcodeAdat } from "../models/paciensAdat";
import FelugroMenu from "../components/FelugroMenu";
import QrCodeElfogadPage from "./QrCodeElfogadPage";

type Props = {};

const DoktorListaPage: React.FC = () => {
  const { listData } = React.useContext(
    GlobalContext
  ) as PaciensKartyaAdatContextType;
  const { name } = useParams<{ name: string }>();
  type FigyelmeztetesHandle = React.ElementRef<typeof Figyelmeztetes2>;
  const refMegjelenit = React.useRef<FigyelmeztetesHandle>(null);
  type FelugroMenuHandle = React.ElementRef<typeof FelugroMenu>;
  const refFelugroMenu = React.useRef<FelugroMenuHandle>(null);
  //e: React.MouseEvent<HTMLDivElement, MouseEvent>
  /* const KartyaClickHandle = async (id: string) => {
    //console.log(id);
    refFelugroMenu.current?.start(id);
  }; */
  const KartyaClickHandle = async (adat: QrcodeAdat) => {
    //console.log(JSON.stringify(adat));
    refFelugroMenu.current?.start(adat);
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
<IonHeader>
        <IonToolbar className="ion-toolbar">
          <IonButtons slot="secondary">
            <IonButton>
              <IonIcon slot="icon-only" icon={cameraOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-title">{name} Joci</IonTitle>
          <IonButtons slot="primary">
            <IonButton>Delete</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
 */
