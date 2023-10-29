import React from "react";
import { IonCol, IonGrid, IonRow, IonIcon, IonLabel } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { propsKozlemeny } from "../Tipusok";

const Kozlemeny = (props: propsKozlemeny) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <section>
      <div onClick={() => setIsOpen(!isOpen)} className="ion-card-item">
        <IonRow>
          <IonCol>
            <div className="ion-text-center">
              <IonIcon
                icon={informationCircleOutline}
                color="danger"
                size="large"
              ></IonIcon>
            </div>
          </IonCol>
        </IonRow>
        {isOpen === true && (
          <IonRow>
            <IonCol>
              <div className="ion-text-center">
                <IonLabel aria-hidden="true" class="ion-text-wrap">
                  {props.Kozlemeny}
                </IonLabel>
              </div>
            </IonCol>
          </IonRow>
        )}
      </div>
    </section>
  );
};

export default Kozlemeny;
/* <>
      <div onClick={() => setIsOpen(!isOpen)} className="ion-card-item">
        <div>
          <IonIcon
            icon={informationCircleOutline}
            color="danger"
            size="large"
          ></IonIcon>
        </div>
        <div>
          {isOpen === true && (
            <IonLabel aria-hidden="true" class="ion-text-wrap">
              {props.kozlemeny}
            </IonLabel>
          )}
        </div>
      </div>
    </> */
