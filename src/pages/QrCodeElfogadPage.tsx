import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAlert,
  useIonAlert,
  IonFab,
  IonFabButton,
  IonText,
  IonButton,
  IonList,
  IonInput,
  IonItem,
  useIonRouter,
} from "@ionic/react";
import {} from "@capacitor/core";
import "./Page.css";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useForm } from "react-hook-form";
import { QrcodeAdat } from "../models/paciensAdat";
import React from "react";
import {
  GlobalContext,
  PaciensKartyaAdatContextType,
} from "../store/ListaContext";

interface QrCodeElfogadPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

let initialValues = {
  id: "",
  key: null,
  orvos: "",
  paciensNev: "",
  szerep: undefined,
  szulDatum: "",
  cimke: "",
};

const QrCodeElfogadPage: React.FC<QrCodeElfogadPageProps> = (props) => {
  const {
    control,
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QrcodeAdat>({
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const { editQrCard } = React.useContext(
    GlobalContext
  ) as PaciensKartyaAdatContextType;

  const router = useIonRouter();

  useEffect(() => {
    //setData(JSON.parse(props.match.params.id));
    //alert(JSON.stringify(props.match.params.id, null, 2));
    const ss = JSON.parse(props.match.params.id);
    setValue("id", ss.id);
    setValue("paciensNev", ss.paciensNev);
    setValue("orvos", ss.orvos);
    setValue("szerep", ss.szerep);
    setValue("szulDatum", ss.szulDatum);
    setValue("cimke", ss.cimke);
    //alert(JSON.stringify(ss, null, 2));
  }, [props.match.params.id]);

  const onSubmit = (data: QrcodeAdat) => {
    //alert(JSON.stringify(data, null, 2));
    editQrCard(data);
    router.goBack();
  };

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-title">Elfogadás</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList>
            <IonItem>
              <IonInput label="Név" {...register("paciensNev")}></IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                label="Születés dátuma"
                readonly={true}
                {...register("szulDatum")}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                label={
                  getValues("szerep")
                    ? getValues("szerep")
                        ?.charAt(0)
                        .toUpperCase()
                        .slice(1)
                        .toLowerCase()
                    : ""
                }
                readonly={true}
                {...register("orvos")}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                label="Emlékeztető"
                placeholder="Megjegyzés pl ...háziorvos"
                {...register("cimke")}
                onIonChange={(e) =>
                  setValue("cimke", e.detail.value ? e.detail.value : "")
                }
              ></IonInput>
            </IonItem>
            <div>
              <IonButton type="submit">Elfogad</IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default QrCodeElfogadPage;
