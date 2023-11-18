import { useState } from "react";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";
import { useIonAlert, useIonRouter } from "@ionic/react";
import { VonalkodHiteles, getDataFromScan } from "../../models/paciensAdat";
import { RoszKodUzenet } from "../../models/Tipusok";
import "./Figyelmeztetes.css";

type Props = {};

const WebRead = (props: Props) => {
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();
  const [scanResult, setScanResult] = useState<Html5QrcodeResult>();

  const scanner = new Html5QrcodeScanner(
    "qr-reader",
    {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    },
    false
  );

  scanner.render(success, error);

  function success(decodedText: string, result: Html5QrcodeResult) {
    scanner.clear();
    if (VonalkodHiteles(decodedText) === false) {
      presentAlert({
        cssClass: "custom-alert",
        header: "Hiba!",
        message: RoszKodUzenet,
        buttons: [{ text: "X", cssClass: "alert-button-cancel" }],
      });
    }
    let adat = JSON.stringify(getDataFromScan(decodedText));
    router.push(`/page/QrCodeElfogadPage/${adat}`, "forward", "pop");
  }

  function error(errorMessage: string, error: Html5QrcodeError) {
    presentAlert({
      cssClass: "custom-alert",
      header: "Hiba!",
      message: errorMessage,
      buttons: [{ text: "X", cssClass: "alert-button-cancel" }],
    });
  }

  return <div id="qr-reader"></div>;
};

export default WebRead;
