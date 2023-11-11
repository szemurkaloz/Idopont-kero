import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { IonAlert, IonButton } from "@ionic/react";
import "./Figyelmeztetes.css";
import { IsOpenHandle } from "../../models/Tipusok";

function Example(
  header: string,
  message: string,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <section>
      <IonAlert
        isOpen={isOpen}
        header={header}
        //subHeader="Important message"
        message={message}
        className="custom-alert"
        buttons={["OK"]}
        onDidDismiss={() => setIsOpen(false)}
      ></IonAlert>
    </section>
  );
}

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

const Figyelmeztetes = (props: Props) => {
  return (
    <section>
      <IonAlert
        isOpen={props.isOpen}
        header={props.header}
        //subHeader="Important message"
        message={props.message}
        className="custom-alert"
        htmlAttributes={{ "aria-label": "alert dialog" }}
        buttons={[{ text: "X", cssClass: "alert-button-cancel" }]}
        onDidDismiss={() => props.setIsOpen(false)}
      ></IonAlert>
    </section>
  );
};

const Figyelmeztetes2 = forwardRef<IsOpenHandle, Props1>((props, ref) => {
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

export { Figyelmeztetes, Example, Figyelmeztetes2 };
