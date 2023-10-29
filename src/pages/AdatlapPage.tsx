import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";
import { App, AppInfo } from "@capacitor/app";
import { isPlatform } from "@ionic/react";
import { useState } from "react";

const AdatlapPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [appInfo, setAppInfo] = useState<AppInfo>();

  const init = async () => {
    if (!isPlatform("desktop")) {
      const _appInfo = await App.getInfo();
      if (_appInfo != undefined) setAppInfo(_appInfo);
    }
  };
  init();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar ion->
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
        <IonContent fullscreen={true} class="ion-padding has-header">
          <IonGrid>
            <IonRow class="ion-padding">
              <IonCol>
                <div className="ion-text-center">
                  <h1 className="font-medium">ProFix Kft.</h1>
                </div>
              </IonCol>
            </IonRow>
            <IonRow class="ion-padding">
              <IonCol>
                <div className="ion-text-center">
                  <p className="text-sm font-medium">
                    6800 Hódmezővásárhely, Szegfű u. 1-3.
                  </p>
                </div>
              </IonCol>
            </IonRow>
            <IonRow class="ion-padding">
              <IonCol>
                <div className="ion-text-center">
                  <p className="text-sm">info@medmax.hu</p>
                </div>
              </IonCol>
            </IonRow>
            <IonRow class="ion-padding">
              <IonCol>
                <div className="ion-text-center">
                  <a
                    className="text-sm bg-gradient-to-r from-rose-600 via-fuchsia-500 to-indigo-700 bg-[length:100%_6px] bg-no-repeat bg-bottom"
                    href="http://elojegyzes.hu/"
                    target="_blank"
                  >
                    Információ
                  </a>
                </div>
              </IonCol>
            </IonRow>
            {appInfo != undefined && (
              <IonRow class="ion-padding">
                <IonCol>
                  <div className="ion-text-center">
                    <p className="text-sm">Verzió:{appInfo.version}</p>
                    <p className="text-sm">build:{appInfo.build}</p>
                  </div>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        </IonContent>
      </IonHeader>
    </IonPage>
  );
};

export default AdatlapPage;

/* 
<section>
            <div className="flex items-center flex-col md:space-y-12 ">
              <p className="text-md font-medium mt-10">ProFix Kft.</p>
              <p className="text-sm font-medium">
                6800 Hódmezővásárhely, Szegfű u. 1-3.
              </p>
              <p className="text-sm">info@medmax.hu</p>
              <a
                className="text-sm bg-gradient-to-r from-rose-600 via-fuchsia-500 to-indigo-700 bg-[length:100%_6px] bg-no-repeat bg-bottom"
                href="http://elojegyzes.hu/"
                target="_blank"
              >
                Információ
              </a>
              {appInfo != undefined && (
                <>
                  <p className="text-sm">Verzió:{appInfo.version}</p>
                  <p className="text-sm">build:{appInfo.build}</p>
                </>
              )}
            </div>
          </section> */
