import React, {useEffect} from "react";

function DropUsuario() {
  useEffect(() => {
    localStorage.clear();
    window.location.href = "http://localhost:3030/logout.html";
  }, []);

      return(
        <div></div>
      );

}

export default DropUsuario;