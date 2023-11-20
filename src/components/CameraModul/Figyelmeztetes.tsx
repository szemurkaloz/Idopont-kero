import { forwardRef, useImperativeHandle, useState } from "react";
import { IonAlert } from "@ionic/react";
import "./Figyelmeztetes.css";
import { IsOpenHandle } from "../../models/Tipusok";

type Props = {
  header: string;
  message: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props1 = {
  header: string;
  message: string;
};

const Figyelmeztetes = forwardRef<IsOpenHandle, Props1>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const Megjelenit = () => {
    setIsOpen(true);
  };

  useImperativeHandle(ref, () => ({
    start() {
      Megjelenit();
    },
  }));

  return (
    <section>
      <IonAlert
        isOpen={isOpen}
        header={props.header}
        //subHeader="Important message"
        message={props.message}
        className="custom-alert"
        htmlAttributes={{ "aria-label": "alert dialog" }}
        buttons={[{ text: "X", cssClass: "alert-button-cancel" }]}
        onDidDismiss={() => setIsOpen(false)}
      ></IonAlert>
    </section>
  );
});

export { Figyelmeztetes };
