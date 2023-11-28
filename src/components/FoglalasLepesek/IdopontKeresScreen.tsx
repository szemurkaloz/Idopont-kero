import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonTextarea,
} from "@ionic/react";
import { useSwiper } from "swiper/react";
import { datumIdoLabel } from "../../models/paciensAdat";
import { FoglalasAllapot } from "../../models/FoglalasLapok";

type Props = {
  foglalasKeres: FoglalasAllapot;
};

const IdopontKeresScreen = (props: Props) => {
  const swiper = useSwiper();

  return (
    <slot>
      <div className="grid grid-cols-1">
        <p className="pt-7 text-xl">Foglalás</p>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Időpontja</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {datumIdoLabel(props.foglalasKeres.key!)}
          </IonCardContent>
        </IonCard>
        <div className="lg:w-96 h-40 sm:w-36 bg-slate-200 mt-7">
          <IonTextarea
            shape="round"
            color={"light"}
            placeholder="Üzenet az orvosnak"
          ></IonTextarea>
        </div>
        <IonButton className="mt-10" onClick={() => swiper.slidePrev()}>
          Előző
        </IonButton>
      </div>
    </slot>
  );
};

export default IdopontKeresScreen;
