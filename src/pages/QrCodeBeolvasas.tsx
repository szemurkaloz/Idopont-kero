import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {} from "@capacitor/core";
import "./Page.css";
import { useState, useEffect } from "react";
import MobilCamera from "../components/CameraModul/MobilCamera";
import { isPlatform } from "@ionic/react";
import WebRead from "../components/CameraModul/WebRead";

type Props = {};

const QrCodeBeolvasas = () => {
  const [isWebCamMod, setIsWebCamMod] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsWebCamMod(isPlatform("desktop"));
    };
    init();
  }),
    [];

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
        <div id="qr-reader">{isWebCamMod && <WebRead />}</div>
        {!isWebCamMod && <MobilCamera />}
      </IonContent>
    </IonPage>
  );
};

export default QrCodeBeolvasas;
