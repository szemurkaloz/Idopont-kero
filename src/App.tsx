import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import DoktorListaPage from "./pages/DoktorListaPage";
import AdatlapPage from "./pages/AdatlapPage";
import QrCodeElfogad from "./pages/QrCodeElfogadPage";
import { GlobalProvider } from "./store/ListaContext";
import QrCodeBeolvasas from "./pages/QrCodeBeolvasas";

setupIonicReact();

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/page/Kapcsolatok" />
              </Route>
              <Route path="/page/:name" exact={true}>
                <Page />
              </Route>
              <Route path="/page/Kapcsolatok" exact={true}>
                <DoktorListaPage />
              </Route>
              <Route path="/page/adatlappage" exact={true}>
                <AdatlapPage />
              </Route>
              <Route
                exact={true}
                path="/page/QrCodeElfogadPage/:id"
                component={QrCodeElfogad}
              />
              <Route
                exact={true}
                path="/page/QrCodeElfogadPage"
                component={QrCodeElfogad}
              />
              <Route path="/page/QrCodeBeolvasas" exact={true}>
                <QrCodeBeolvasas />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </GlobalProvider>
  );
};

export default App;
