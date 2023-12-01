import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonChip,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { SelectedOraProps } from "../../models/Tipusok";
import { idoLabel } from "../../models/paciensAdat";
import { fetchListaIdo } from "../../store/AxiosKeresek";

const OraPercListaValasztas = (props: SelectedOraProps) => {
  const idoTomb = useData(props.foglalasKeres.id, props.foglalasKeres.key);
  const swiper = useSwiper();

  function KartyaClickHandle(item: { key: string }) {
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
        </div>
      )}
      <IonButton className="mt-10" onClick={() => swiper.slidePrev()}>
        Előző
      </IonButton>
    </div>
  );
};

export default OraPercListaValasztas;

function useData(id: string, datum: string | null) {
  const [idoTomb, setIdoTomb] = useState([{ key: "" }]);
  if (datum === null) return null;
  useEffect(() => {
    //console.log("Dátumlista kezd");
    fetchListaIdo(id, datum).then((x) => {
      //console.log(`Dátumlista datum: ${x}`);
      setIdoTomb(x);
    });
  }, [id]);
  return idoTomb;
}
