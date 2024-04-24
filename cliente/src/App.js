import React from "react";
import Footer from "./footer";
import GestionBicicletas from "./GestionBicicletas";
import RegistrarUsuario from "./RegistrarUsuario";
import Header from "./header";
import './App.css';

function App() {
  return (
    <div className="App">
    <Header />
    <main>
    <RegistrarUsuario/>
    </main>
    <Footer />
  </div>
  );
}

export default App;
