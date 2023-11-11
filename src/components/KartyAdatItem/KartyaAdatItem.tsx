import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import Kozlemeny from "./Kozlemeny";
import { propsKozlemeny } from "../../models/Tipusok";
import FoglalasiIdopont from "./FoglalasiIdopont";
import { PaciensKartyaAdat } from "../../models/paciensAdat";

export interface Props {
  item: PaciensKartyaAdat;
}

const KartyaAdatItem = (props: Props) => {
  const item = props.item;
  /* const item = {
    fogIdopont: {
      key: "2021-11-02T08:20:00.000+01:00",
      label: "",
      uzenet: "Nincs elérhető szabad időpont.",
    },
    id: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
    key: "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
    kozlemeny:
      "Valami nagyon fontos közlendő ddfgfhun nnghtzu rrewdsdsrtzuon eertz",
    orvos: "Mónika PKPlus",
    paciensNev: "3 Év Alatti Gyermek",
    cimke: "aszisztens",
    szerep: "orvos",
    szulDatum: "2018-01-31",
  }; */
  return (
    <section>
      <div className="border-y-cyan-50 border-5 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-400">
        <IonGrid>
          <IonRow>
            <IonCol>
              <div className="ion-text-center">
                <h2>{item.paciensNev}</h2>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="ion-text-center">
                <h2>{item.szulDatum}</h2>
                <hr id="center"></hr>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="ion-text-center">
                <h2>{item.orvos}</h2>
              </div>
            </IonCol>
          </IonRow>
          {item.kozlemeny && <Kozlemeny Kozlemeny={item.kozlemeny} />}
          {item.szerep !== "" && (
            <IonRow>
              <IonCol></IonCol>
              <IonCol size="9">
                <div className="ion-text-left padding-left-10">
                  <IonLabel aria-hidden="true">{item.szerep}</IonLabel>
                </div>
              </IonCol>
            </IonRow>
          )}
          {item.fogIdopont !== null && (
            <div>
              <hr id="feher"></hr>
              <FoglalasiIdopont
                key={item.fogIdopont.key}
                label={item.fogIdopont.label}
                uzenet={item.fogIdopont.uzenet}
              />
            </div>
          )}
        </IonGrid>
      </div>
    </section>
  );
};

export default KartyaAdatItem;
