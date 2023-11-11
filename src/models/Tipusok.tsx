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
