import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  ScanOptions,
} from "@capacitor-mlkit/barcode-scanning";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonText,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { scan } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { Figyelmeztetes } from "./Figyelmeztetes";
import { VonalkodHiteles, getDataFromScan } from "../../models/paciensAdat";
import { RoszKodUzenet } from "../../models/Tipusok";

//type Props = { parentFunction: Function };
type Props = {};

const MobilCamera = (props: Props) => {
  const [isSupported, setIsSupported] = useState(false);
  type FigyelmeztetesHandle = React.ElementRef<typeof Figyelmeztetes>;
  const refMegjelenit = React.useRef<FigyelmeztetesHandle>(null);
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    BarcodeScanner.isSupported().then((result) => {
      setIsSupported(result.supported);
      console.log(`Beolvasás támogatott: ${result.supported}`);
    });
  }, [isSupported]);

  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === "granted" || camera === "limited";
  };

  const openScanner = async () => {
    /* webben nincs csomag alapból
    const vanMasolo = await BarcodeScanner.isSupported();
    if (!vanMasolo.supported) {
      console.log("Telepítés");
      presentAlert({
        header: "A Short Title Is Best",
        subHeader: "A Sub Header Is Optional",
        message: "A message should be a short, complete sentence.",
        buttons: ["Action"],
      });
    }*/
    const granted = await requestPermissions();
    console.log(`Engedélyezett: ${granted}`);
    if (!granted) {
      //presentAlertHivas();
      return;
    }
    //Néhány telefonon nincs rajta
    const elerheto =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    //console.log(`Modul elérhető: ${elerheto.available}`);
    if (!elerheto.available) {
      //console.log("Telepítés");
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    }
    //Options
    let options = { formats: [BarcodeFormat.QrCode] };
    //QrCode = 'QR_CODE',
    const { barcodes } = await BarcodeScanner.scan(options);
    //console.log(`Barcode array: ${JSON.stringify(barcodes[0].displayValue)}`);
    if (VonalkodHiteles(barcodes[0].displayValue) === false) {
      refMegjelenit.current?.start();
    }
    let qrcodeAdat = getDataFromScan(barcodes[0].displayValue);
    //alert(JSON.stringify(qrcodeAdat, null, 2));
    let adat = JSON.stringify(qrcodeAdat);
    router.push(`/page/QrCodeElfogadPage/${adat}`, "forward", "pop");
  };

  return (
    <>
      <Figyelmeztetes
        header="Hiba!"
        message={RoszKodUzenet}
        ref={refMegjelenit}
      />
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton
          onClick={() => {
            openScanner();
          }}
          disabled={!isSupported}
        >
          <IonIcon icon={scan}></IonIcon>
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default MobilCamera;
/* 
Barcode array: [{
"bytes":[57,57,49,50,45,49,52,65,67,67,57,70,65,45,65,54,51,70,45,52,70,48,66,45,65,68,50,70,45,51,56,48,56,68,67,65,65,51,68,69,52,45,50,51,50,68,70,54,48,55,45,56,68,52,54,45,52,52,54,68,45,65,55,56,51,45,52,67,49,70,56,66,54,49,68,51,69,65,35,65,108,109,97,32,66,101,-31,116,97,35,50,48,48,48,45,48,49,45,48,49,35,75,111,118,-31,99,115,32,74,-13,122,115,101,102,35,111,114,118,111,115],
"displayValue":"9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-232DF607-8D46-446D-A783-4C1F8B61D3EA#Alma Beáta#2000-01-01#Kovács József#orvos","format":"QR_CODE","valueType":"TEXT"}] */
