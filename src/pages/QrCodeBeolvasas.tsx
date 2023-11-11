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
} from "@ionic/react";
import { Barcode, BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import {} from "@capacitor/core";
import "./Page.css";
import { useState, useEffect } from "react";
import { barcode, scan } from "ionicons/icons";
import { Example } from "../components/CameraModul/Figyelmeztetes";
import MobilCamera from "../components/CameraModul/MobilCamera";

type Props = {};

const QrCodeBeolvasas = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [getBarcodes, setBarcodes] = useState<Barcode[]>([]);

  useEffect(() => {
    //setIsOpen(false);
    BarcodeScanner.isSupported().then((result) => {
      setIsSupported(result.supported);
      console.log(`Beolvasás támogatott: ${result.supported}`);
    });
  }, [isSupported]);

  const openScanner = async () => {
    /*
    const granted = await requestPermissions();
    console.log(`Engedélyezett: ${granted}`);
    if (!granted) {
      presentAlertHivas();
      return;
    }
    //Néhány telefonon nincs rajta
    const elerheto =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    console.log(`Modul elérhető: ${elerheto.available}`);
    if (!elerheto.available) {
      console.log("Telepítés");
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    }
    //QrCode = 'QR_CODE',
    const { barcodes } = await BarcodeScanner.scan();
    console.log(`Barcode: ${barcodes}`);
    setBarcodes((oldvalue) => [...oldvalue, ...barcodes]);
    const [presentAlert] = useIonAlert();
    presentAlert({
      header: "Beolvasott adat",
      message: `barcode code: +${barcodes}`,
      buttons: ["OK"],
    }); /**/
  };

  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === "granted" || camera === "limited";
  };

  const presentAlertHivas = () => {
    const [presentAlert] = useIonAlert();
    presentAlert({
      header: "Engedély megtagadva!",
      message: "Please grant camera permission to use the barcode scanner.",
      buttons: ["OK"],
    });
  };

  //const { title } = useParams<{ title: string }>();
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
        <MobilCamera />
      </IonContent>
    </IonPage>
  );
};

export default QrCodeBeolvasas;
