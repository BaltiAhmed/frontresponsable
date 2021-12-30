import { Authcontext } from "./context/auth-context";
import { RPAuth } from "./hooks/RPAuth-houks";
import { RLAuth } from "./hooks/RLAuth-houks";
import { AdminAuth } from "./hooks/adminAuth-houks";
import { Route, BrowserRouter } from "react-router-dom";
import ListeProduit from "./pages/responsable-produit.js/liste-produit";
import RLHome from "./pages/RLHome";
import Login from "./pages/login";
import NavLogin from "./components/nav-login";
import NavBarRP from "./components/responsable-produit/nav-bar";
import NavBarRL from "./components/responsable-livraison/nav-bar";
import React from "react";
import AjoutProduit from "./pages/responsable-produit.js/ajout-produit";
import UpdateProduit from "./pages/responsable-produit.js/update-produit";
import image from "./images/image.jpg";
import Admin from "./pages/admin/pages/login";
import Home from "./pages/home";
import { RotateLeft } from "@material-ui/icons";
import ListCommande from "./pages/reponsable-livraison.js/list-commande";
import DetailCommande from "./pages/reponsable-livraison.js/detailsCommande";
import ListLivreur from "./pages/reponsable-livraison.js/list-livreur";
import ListDemandeRetourArticle from "./pages/reponsable-livraison.js/demandeRetourAticle";
import ListeRP from "./pages/admin/pages/liste-responsable-produit";
import ListRL from "./pages/admin/pages/list-responsable-livraison";
import ListClient from "./pages/admin/pages/gestion_client/list-client";
import NavBarAdmin from './pages/admin/components/nav-bar'

function App() {
  const { RPId, RPLogin, RPLogout, RPToken } = RPAuth();
  const { RLId, RLLogin, RLLogout, RLToken } = RLAuth();
  const { adminId, adminLogin, adminLogout, adminToken } = AdminAuth();

  let routes;

  if (RPToken) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={ListeProduit} />
        <Route path="/ajout-produit" component={AjoutProduit} />
        <Route path="/update-produit/:id" component={UpdateProduit} />
      </React.Fragment>
    );
  } else if (RLToken) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={ListCommande} />
        <Route path="/detailCommande/:id" exact component={DetailCommande} />
        <Route path="/liste-livreur" exact component={ListLivreur} />
        <Route
          path="/liste-demande-retour-article"
          exact
          component={ListDemandeRetourArticle}
        />
      </React.Fragment>
    );
  } else if (adminToken) {
    routes = (
      <React.Fragment>
        <Route path="/liste-RP" exact component={ListeRP} />
        <Route path="/liste-RL" component={ListRL} />
        <Route path="/liste-client" component={ListClient} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/responsable"  component={Login} />
        <Route path="/admin" component={Admin} />
      </React.Fragment>
    );
  }

  return (
    <Authcontext.Provider
      value={{
        RPId: RPId,
        RPToken: RPToken,
        RPLogin: RPLogin,
        RPLogout: RPLogout,
        RLId: RLId,
        RLToken: RLToken,
        RLLogin: RLLogin,
        RLLogout: RLLogout,
        adminId: adminId,
        adminToken: adminToken,
        adminLogin: adminLogin,
        adminLogout: adminLogout,
      }}
    >
      <div
        style={{
          backgroundImage: "url(" + image + ")",
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <BrowserRouter>
          {!RPToken && !RLToken && !adminToken && <NavLogin />}
          {RPToken && !RLToken && !adminToken && <NavBarRP content={routes} />}
          {RLToken && !RPToken && !adminToken && <NavBarRL content={routes} />}
          {adminToken && !RPToken && !RLToken && <NavBarAdmin content={routes} />}
          {!RPToken && !RLToken && !adminToken && routes}
        </BrowserRouter>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Authcontext.Provider>
  );
}

export default App;
