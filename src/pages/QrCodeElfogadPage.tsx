import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAlert,
  useIonAlert,
  IonFab,
  IonFabButton,
  IonText,
  IonButton,
  IonList,
  IonInput,
  IonItem,
} from "@ionic/react";
import { Barcode, BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import {} from "@capacitor/core";
import "./Page.css";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";

type Props = {
  adat: {
    paciensNev: "3 Év Alatti Gyermek";
    szulDatum: "2018-01-31";
    orvos: "Kovács József";
    cimke: "Gyerekorvos34";
    key: "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-76D06771-872F-48AF-BAFC-25819937B0A5";
    id: "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-76D06771-872F-48AF-BAFC-25819937B0A5";
    szerep: "asszisztens";
  };
};

interface QrCodeElfogadPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const QrCodeElfogadPage: React.FC<QrCodeElfogadPageProps> = (props) => {
  //console.log(JSON.stringify(props, null, 2));
  const adat = JSON.parse(props.match.params.id);
  console.log(JSON.stringify(adat, null, 2));
  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-title">Elfogadás</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonInput
              label="Név"
              placeholder="Enter text"
              value={adat.id}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput label="Floating label" placeholder="000"></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Password input"
              type="password"
              value="password"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Email input"
              type="email"
              placeholder="email@domain.com"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Telephone input"
              type="tel"
              placeholder="888-888-8888"
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default QrCodeElfogadPage;
