import { FoglalasAllapot, FoglalasLapActions } from "./FoglalasLapok";
import { QrcodeAdat } from "./paciensAdat";

export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export interface FogIdopont {
  key: string;
  label: string;
  uzenet: string;
}

export interface propsKozlemeny {
  Kozlemeny: string;
}

export type IsOpenHandle = {
  start: () => void;
};

export type IsOpenFelugroHandle = {
  start: (kartya: QrcodeAdat) => void;
};

export type SelectedDayProps = {
  id: string;
  dispatch: React.Dispatch<FoglalasLapActions>;
};

export type SelectedOraProps = {
  foglalasKeres: FoglalasAllapot;
  dispatch: React.Dispatch<FoglalasLapActions>;
};

export const RoszKodUzenet = `Nem jó formátum!
Ellenőrizd, hogy a jó QR kódot olvasod-e be.`;
export const IsmetlesiUzenet = `Ez a QR kód tartalom,
már szerepel a tárolt adatok között.`;
