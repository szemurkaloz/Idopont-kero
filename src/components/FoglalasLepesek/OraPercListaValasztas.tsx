import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonChip,
} from "@ionic/react";
import { useState } from "react";
import { useSwiper } from "swiper/react";
import { SelectedDayProps } from "../../models/Tipusok";
import { idoLabel } from "../../models/paciensAdat";

const OraPercTomb = [
  { key: "2021-08-06T08:00:00.000+02:00", label: "08:00" },
  { key: "2021-08-07T08:15:00.000+02:00", label: "08:15" },
  { key: "2021-08-08T08:30:00.000+02:00", label: "08:30" },
  { key: "2021-08-10T08:45:00.000+02:00", label: "08:45" },
  { key: "2021-08-11T09:00:00.000+02:00", label: "09:00" },
];

const OraPercListaValasztas = (props: SelectedDayProps) => {
  const [idoTomb, setIdoTomb] = useState(OraPercTomb);
  const swiper = useSwiper();

  function KartyaClickHandle(item: { key: string; label: string }) {
    props.dispatch({ type: "tovabb", datum: item.key });
    swiper.slideNext();
  }

  return (
    <div>
      <p className="pt-7 text-xl">Válassza ki az időpontot</p>
      {!idoTomb && (
        <div className="pt-7">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Értesítés</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Nincs közzétett időpont, vagy elfogyott.
            </IonCardContent>
          </IonCard>
          <IonButton className="pt-7" onClick={() => swiper.slidePrev()}>
            Előző
          </IonButton>
        </div>
      )}
      {idoTomb && (
        <div>
          <ul>
            {idoTomb.map((item) => (
              <li
                key={item.key}
                className="flex-1 flex-col justify-normal mt-10"
                onClick={() => {
                  KartyaClickHandle(item);
                }}
              >
                <IonChip>
                  <IonLabel className="w-28">{idoLabel(item.key)}</IonLabel>
                </IonChip>
              </li>
            ))}
          </ul>
          <IonButton className="mt-10" onClick={() => swiper.slidePrev()}>
            Előző
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default OraPercListaValasztas;
