import React from "react";
import Footer from "./footer";
import GestionBicicletas from "./GestionBicicletas";
import RegistrarUsuario from "./RegistrarUsuario";
import InicioSesion from "./InicioSesion";
import Header from "./header";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/registrar" component={RegistrarUsuario}/>
            <Route path="/citybike" component={GestionBicicletas}/>
            <Route path="/login" component={InicioSesion}/> {/* Agrega la ruta para el componente InicioSesion */}
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
