import React, {useEffect, useState} from "react";
import {useForm } from 'react-hook-form';


function ModificarEstacion(props) {
    const { idEstacion } = props.match.params;

    const { register, handleSubmit, setValue } = useForm();

    function onSubmit(data) {
        fetch(`/estaciones/${idEstacion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            window.location.href = "http://localhost:3030/estaciones"
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    }

    useEffect(() => {
        fetch(`/estaciones/${idEstacion}`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            setValue("nombre", data[0].nombre)
            setValue('capacidad', data[0].capacidad)
            setValue('codigo_postal', data[0].codigo_postal)
          })
      }, [])

    return (
        <div className="container-fluid form-margin">
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center">Modificar estacion</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group row mb-4">
                                <label htmlFor="nombre" className="col-sm-3 col-form-label">Nombre:</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="nombre" name="nombre" required 
                                    {...register('nombre')}/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label htmlFor="capacidad" className="col-sm-3 col-form-label">Capacidad:</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="capacidad" name="capacidad" required
                                   {...register('capacidad')}/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label htmlFor="codigo_postal" className="col-sm-3 col-form-label">Código postal:</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="codigo_postal" name="codigo_postal" required
                                    {...register('codigo_postal')}/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <div className="col-sm-12 text-center">
                                    <button type="submit" className="btn btn-primary">Modificar estación</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );

}

export default ModificarEstacion;