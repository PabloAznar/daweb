import React from "react";
import Footer from "./footer";
import GestionBicicletas from "./GestionBicicletas";
import Register from "./register";
import Header from "./header";
import './App.css';

function App() {
  return (
    <div className="App">
    <Header />
    <main>
    <Register></Register>
    </main>
    <Footer />
  </div>
  );
}

export default App;
