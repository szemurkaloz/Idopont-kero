import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";
import FoglalasiIdopont from "../components/KartyAdatItem/FoglalasiIdopont";
import KartyaAdatItem from "../components/KartyAdatItem/KartyaAdatItem";
import { cameraOutline } from "ionicons/icons";

type Props = {};

const DoktorListaPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  console.log("Kapott paraméter" + name);
  const fogIdopont = {
    key: "2021-11-02T00:00:00.000+01:00",
    label: "2021-11-02T00:00:00.000+01:00",
    uzenet: "Időpontja",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar">
          <IonButtons slot="secondary">
            <IonButton>
              <IonIcon slot="icon-only" icon={cameraOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-title">{name} Joci</IonTitle>
          <IonButtons slot="primary">
            <IonButton>Delete</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="secondary">
              <IonButton size="large">Favorite</IonButton>
            </IonButtons>
            <IonTitle>Default Buttons</IonTitle>
            <IonButtons slot="primary">
              <IonButton>Delete</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <KartyaAdatItem />
      </IonContent>
    </IonPage>
  );
};

export default DoktorListaPage;
/* 
<IonHeader>
        <IonToolbar className="ion-toolbar">
          <IonButtons slot="secondary">
            <IonButton>
              <IonIcon slot="icon-only" icon={cameraOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-title">{name} Joci</IonTitle>
          <IonButtons slot="primary">
            <IonButton>Delete</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
 */
