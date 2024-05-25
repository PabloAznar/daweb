import React, {useEffect} from "react";

function SetUsuario(props) {
    const { idUsuario } = props.match.params;
    useEffect(() => {
        fetch(`/users/${idUsuario}`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            localStorage.clear()
            localStorage.setItem('usuario', JSON.stringify(data[0]))
            if(data[0].rol === 'GESTOR') {
                window.location.href = "http://localhost:3030/estaciones"
            }
            else {
                window.location.href = "http://localhost:3000/citybike"
            }
          })
      }, [])

      return(
        <div></div>
      );

}

export default SetUsuario;