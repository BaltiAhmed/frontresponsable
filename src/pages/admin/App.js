import React from "react";
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/auth-hooks";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import NavLogin from './components/nav-login'
import NavBar from './components/nav-bar'
import Login from "./pages/login";
import ListeRP from "./pages/liste-responsable-produit";
import ListRL from "./pages/list-responsable-livraison";
import ListClient from "./pages/gestion_client/list-client";
import image from "./images/image.jpg"

function Admin() {
  const { user, token, login, logout } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/admin"  component={ListeRP} />
        <Route path="/admin/liste-RL" component={ListRL} />
        <Route path="/admin/liste-client" component={ListClient} />

      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/admin" component={Login} />
      </React.Fragment>
    );
  }
  return (
    <Authcontext.Provider value={{ user: user, token: token, login: login, logout: logout }}>
      <BrowserRouter>

        {token && <NavBar content={routes} />}
        {!token && routes}
      </BrowserRouter>


    </Authcontext.Provider>
  );
}

export default Admin;
