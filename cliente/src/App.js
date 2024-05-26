import React from "react";
import Footer from "./footer";
import GestionBicicletas from "./GestionBicicletas";
import RegistrarUsuario from "./RegistrarUsuario";
import Header from "./header";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReservaBicicletas from "./ReservaBicicletas";
import ModificarEstacion from "./ModificarEstacion";
import SetUsuario from "./SetUsuario";
import DropUsuario from "./DropUsuario";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/usuario/:idUsuario" component={SetUsuario}/>
            <Route path="/logout" component={DropUsuario}/>
            <Route path="/registrar" component={RegistrarUsuario}/>
            <Route path="/citybike" component={GestionBicicletas}/>
            <Route path="/estaciones/:idEstacion/bicicletas" component={ReservaBicicletas}/>
            <Route path="/estacion/modificar/:idEstacion" component={ModificarEstacion}/>
          </Switch>
        </BrowserRouter>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
