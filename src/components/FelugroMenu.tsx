import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { IonActionSheet, IonButton } from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useIonRouter } from "@ionic/react";

import "./FelugroMenu.css";
import { IsOpenFelugroHandle, IsOpenHandle } from "../models/Tipusok";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { QrcodeAdat } from "../models/paciensAdat";

type Props = {};

const FelugroMenu = forwardRef<IsOpenFelugroHandle, Props>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [kartya, setKartya] = useState<QrcodeAdat>();
  const history = useHistory();
  const router = useIonRouter();

  const Megjelenit = () => {
    setIsOpen(true);
  };

  useImperativeHandle(ref, () => ({
    start(kartya: QrcodeAdat) {
      setKartya(kartya);
      Megjelenit();
    },
  }));

  const menuClikHandle = async (detail: OverlayEventDetail<any>) => {
    if (detail.data.action === "szerkesztes") {
      //history.push("/page/QrCodeElfogadPage");
      let adat = JSON.stringify(kartya);
      router.push(`/page/QrCodeElfogadPage/${adat}`, "root", "push");
      //setIsOpen(false);Feljebb lévő csomópont lekezeli
    }
  };

  return (
    <div className="container">
      <IonActionSheet
        className="my-custom-class"
        isOpen={isOpen}
        //trigger="open-action-sheet" Magátol megnyílik
        header="______"
        buttons={[
          {
            text: "Időpontkérés",
            // icon: "../assets/icon/calendar-outline.svg",
            icon: "/calendar-outline.svg",
            role: "selected",
            data: {
              action: "Idopontkeres",
            },
          },
          {
            text: "Szerkesztés",
            icon: "/create-outline.svg",
            data: {
              action: "szerkesztes",
            },
          },
          {
            text: "Törlés",
            icon: "trash-bin-outline.svg",
            data: {
              action: "torles",
            },
          },
        ]}
        onDidDismiss={({ detail }) => menuClikHandle(detail)}
        onClick={() => {
          setIsOpen(false);
        }}
      ></IonActionSheet>
    </div>
  );
});

export default FelugroMenu;
/* {
  "data": {
    "action": "szerkesztes"
  }
} */