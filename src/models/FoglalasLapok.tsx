export enum FoglalasLapTipus {
  KerdesLap = 0,
  DatumLap = 1,
  NyugtaLap = 2,
}
export type FoglalasAllapot = {
  id: string;
  key: string | null;
  lap: FoglalasLapTipus;
};

export type FoglalasLapActions = {
  type: "tovabb" | "vissza";
  datum: string;
};

export function createInitialState(id: string) {
  let a: FoglalasAllapot = {
    id: id,
    key: null,
    lap: FoglalasLapTipus.DatumLap,
  };
  return a;
}

export function reducer(state: FoglalasAllapot, action: FoglalasLapActions) {
  switch (action.type) {
    case "tovabb": {
      return {
        ...state,
        key: action.datum,
        lap: state.lap + 1,
      };
    }
    case "vissza": {
      return {
        ...state,
        lap: state.lap - 1,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}
