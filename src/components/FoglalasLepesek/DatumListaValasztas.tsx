import { IonButton, IonChip, IonLabel } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { datumLabel } from "../../models/paciensAdat";
import { SelectedDayProps } from "../../models/Tipusok";
import { fetchListaDate } from "../../store/AxiosKeresek";

const DatumListaValasztas = (props: SelectedDayProps) => {
  const datumTomb = useData(props.id);
  const swiper = useSwiper();

  function KartyaClickHandle(item: { key: string }) {
    props.dispatch({ type: "tovabb", datum: item.key });
    swiper.slideNext();
  }

  return (
    <div>
      <p className="pt-7 text-xl">Válassza ki a napot</p>
      {Array.isArray(datumTomb) && (
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
      )}
    </div>
  );
};

export default DatumListaValasztas;

function useData(id: string) {
  const [datumTomb, setdatumTomb] = useState([{ key: "" }]);
  useEffect(() => {
    //console.log("Dátumlista kezd");
    fetchListaDate(id).then((x) => {
      //console.log(`Dátumlista datum: ${x}`);
      setdatumTomb(x);
    });
  }, [id]);
  return datumTomb;
}
