import { IonButton, IonChip, IonLabel } from "@ionic/react";
import { useState } from "react";
import { useSwiper } from "swiper/react";
import { datumLabel } from "../../models/paciensAdat";
import { SelectedDayProps } from "../../models/Tipusok";

const NapokTomb = [
  { key: "2021-08-06T08:00:00.000+02:00", label: "2021-08-06" },
  { key: "2021-08-07T08:15:00.000+02:00", label: "2021-08-07" },
  { key: "2021-08-08T08:30:00.000+02:00", label: "2021-08-08" },
  { key: "2021-08-10T08:45:00.000+02:00", label: "2021-08-10" },
  { key: "2021-09-11T08:00:00.000+02:00", label: "2021-08-11" },
  { key: "2021-08-12T08:15:00.000+02:00", label: "2021-08-12" },
  { key: "2021-08-13T08:30:00.000+02:00", label: "2021-08-13" },
];

const DatumListaValasztas = (props: SelectedDayProps) => {
  const [datumTomb, setdatumTomb] = useState(NapokTomb);
  const swiper = useSwiper();

  function KartyaClickHandle(item: { key: string; label: string }) {
    props.dispatch({ type: "tovabb", datum: item.key });
    swiper.slideNext();
  }

  return (
    <div>
      <p className="pt-7 text-xl">Válassza ki a napot</p>
      <ul>
        {datumTomb.map((item) => (
          <li
            key={item.key}
            className="flex-1 flex-col justify-normal mt-10"
            onClick={() => {
              KartyaClickHandle(item);
            }}
          >
            <IonChip>
              <IonLabel className="w-28">{datumLabel(item.key)}</IonLabel>
            </IonChip>
          </li>
        ))}
      </ul>
      <IonButton
        className="mt-10"
        /* onClick={() => swiper.slideNext()} */
      ></IonButton>
    </div>
  );
};

export default DatumListaValasztas;
