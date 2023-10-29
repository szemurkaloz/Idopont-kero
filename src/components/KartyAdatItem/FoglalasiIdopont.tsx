import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { FogIdopont } from "../Tipusok";

const FoglalasiIdopont = (props: FogIdopont) => {
  //new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  // "Friday, Jul 2, 2021"
  const currentDate = new Date(props.label);
  const strDate = currentDate.toLocaleDateString("hu-HU");
  return (
    <section>
      <IonRow>
        <IonCol>
          <div className="ion-text-center mt-4">
            <h2>Időpontja:</h2>
            <p>{props.label}</p>
          </div>
        </IonCol>
      </IonRow>
    </section>
  );
};

export default FoglalasiIdopont;

/* <div className="ion-fog-idopont-item">
        <div>Időpontja:</div>
        <div>{props.label === "" ? props.uzenet : props.label}</div>
        <div>{strDate}</div>
      </div> */
