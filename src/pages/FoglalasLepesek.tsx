import { useEffect, useReducer, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";

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
import { RouteComponentProps } from "react-router";
import IdopontKeresScreen from "../components/FoglalasLepesek/IdopontKeresScreen";
import { createInitialState, reducer } from "../models/FoglalasLapok";

interface FoglalasLepesekProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const FoglalasLepesek: React.FC<FoglalasLepesekProps> = (props) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(props.match.params.id)
  );

  useEffect(() => {
    if (swiperInstance !== undefined) {
      swiperInstance.activeIndex = 0;
    }
  }, [props.match.params]);

  /* swiperInstance?.on("slideChange", function () {
    if (state.key === null) {
      swiperInstance.activeIndex = 1;
    }
  }); */

  return (
    <IonPage>
      <IonContent>
        <Swiper
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          initialSlide={0}
          init={true}
          autoplay={true}
          keyboard={true}
          pagination={true}
          scrollbar={false}
          allowTouchMove={false}
          history={false}
          zoom={true}
        >
          <SwiperSlide>
            <DatumListaValasztas dispatch={dispatch} />
          </SwiperSlide>
          <SwiperSlide>
            <OraPercListaValasztas dispatch={dispatch} />
          </SwiperSlide>
          <SwiperSlide>
            <IdopontKeresScreen foglalasKeres={state} />
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default FoglalasLepesek;
