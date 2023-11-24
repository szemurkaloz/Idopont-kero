import { useEffect, useRef, useState } from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import {
  Swiper,
  SwiperClass,
  SwiperProps,
  SwiperRef,
  SwiperSlide,
  useSwiper,
} from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";
import DatumListaValasztas from "../components/FoglalasLepesek/DatumListaValasztas";
import OraPercListaValasztas from "../components/FoglalasLepesek/OraPercListaValasztas";
import { Swiper as SwiperInterface } from "swiper";
import { FoglalasKeres } from "../models/paciensAdat";
import { RouteComponentProps } from "react-router";
import IdopontKeresScreen from "../components/FoglalasLepesek/IdopontKeresScreen";

interface FoglalasLepesekProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const FoglalasLepesek: React.FC<FoglalasLepesekProps> = (props) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
  const faglalasDatumRef = useRef<FoglalasKeres>({
    id: "",
    key: "",
  });

  useEffect(() => {
    //Lekérni a listát
    faglalasDatumRef.current!.id = props.match.params.id;
    console.log(`Itt van ${props.match.params.id}`);
  }),
    [props.match.params.id];

  swiperInstance?.on("slideChange", function () {
    swiperInstance.activeIndex = 0;
  });

  const handleSelectedDay = (dateKey: string) => {
    faglalasDatumRef.current!.key = dateKey;
  };

  const Mutasd = () => {
    alert(faglalasDatumRef.current!.key);
  };

  function getParameter() {
    return {
      id: faglalasDatumRef.current!.id,
      key: faglalasDatumRef.current!.key,
    };
  }

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={() => Mutasd()}>Mutasd</IonButton>
        <Swiper
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          initialSlide={0}
          autoplay={true}
          keyboard={true}
          pagination={true}
          scrollbar={false}
          history={false}
          zoom={true}
        >
          <SwiperSlide>
            <DatumListaValasztas selectedDay={faglalasDatumRef} />
          </SwiperSlide>
          <SwiperSlide>
            <OraPercListaValasztas selectedDay={faglalasDatumRef} />
          </SwiperSlide>
          <SwiperSlide>
            <IdopontKeresScreen foglalasKeres={getParameter()} />
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default FoglalasLepesek;
