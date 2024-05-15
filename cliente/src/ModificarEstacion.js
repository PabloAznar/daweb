import React, {useEffect, useState} from "react";
import {useForm } from 'react-hook-form';


function ModificarEstacion(props) {
    const { idEstacion } = props.match.params;

    const { register, handleSubmit, setValue } = useForm();
    const {est, setEst} = useState({
        nombre: '',
        capacidad: '',
        numeroBicicletas: '',
        codigoPostal: ''
    });

    function onSubmit(data) {
        fetch(`/estaciones/${idEstacion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
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
            setValue('numero_bicicletas', data[0].numero_bicicletas)
            setValue('codigo_postal', data[0].codigo_postal)
          })
      }, [])

    const usuario = localStorage.getItem('usuario')
    console.log(usuario)
    return (
        <div class="container-fluid form-margin">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2 class="text-center">Modificar estacion</h2>
                    </div>
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="form-group row mb-4">
                                <label for="nombre" class="col-sm-3 col-form-label">Nombre:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="nombre" name="nombre" required 
                                    {...register('nombre')}/>
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="capacidad" class="col-sm-3 col-form-label">Capacidad:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="capacidad" name="capacidad" required
                                   {...register('capacidad')}/>
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="numero_bicicletas" class="col-sm-3 col-form-label">Número bicicletas:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="numero_bicicletas" name="numero_bicicletas" required
                                    {...register('numero_bicicletas')}/>
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="codigo_postal" class="col-sm-3 col-form-label">Código postal:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="codigo_postal" name="codigo_postal" required
                                    {...register('codigo_postal')}/>
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary">Modificar estación</button>
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