import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
} from "@ionic/react";
import React from "react";
import { useSwiper } from "swiper/react";
import { FoglalasKeres, datumIdoLabel } from "../../models/paciensAdat";

type Props = {
  foglalasKeres: FoglalasKeres;
};

const IdopontKeresScreen = (props: Props) => {
  const swiper = useSwiper();
  return (
    <slot>
      <p className="pt-7 text-xl">Foglalás</p>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Időpontja</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {datumIdoLabel(props.foglalasKeres.key)}
        </IonCardContent>
      </IonCard>
      <IonButton className="mt-10" onClick={() => swiper.slidePrev()}>
        Előző
      </IonButton>
    </slot>
  );
};

export default IdopontKeresScreen;
