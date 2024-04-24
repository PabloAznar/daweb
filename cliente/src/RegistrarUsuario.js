import './registro.css'
import React from 'react';
import {useForm } from 'react-hook-form';

function RegistrarUsuario() {
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        fetch('/register', {
            method: 'POST',
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

    return (
        <div class="container-fluid form-margin">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="text-center">Registro</h2>
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
                                    <label for="apellidos" class="col-sm-3 col-form-label">Apellidos:</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="apellidos" name="apellidos" required
                                        {...register('apellidos')}/>
                                    </div>
                                </div>
                                <div class="form-group row mb-4">
                                    <label for="correo" class="col-sm-3 col-form-label">Correo electrónico:</label>
                                    <div class="col-sm-9">
                                        <input type="email" class="form-control" id="correo" name="correo" required
                                        {...register('correo')}/>
                                    </div>
                                </div>
                                <div class="form-group row mb-4">
                                    <label for="clave" class="col-sm-3 col-form-label">Clave:</label>
                                    <div class="col-sm-9">
                                        <input type="password" class="form-control" id="clave" name="clave" required
                                        {...register('clave')}/>
                                    </div>
                                </div>
                                <div class="form-group row mb-4">
                                    <label for="fechaNacimiento" class="col-sm-3 col-form-label">Fecha de nacimiento:</label>
                                    <div class="col-sm-9">
                                        <input type="date" class="form-control" id="fechaNacimiento"
                                            name="fechaNacimiento" required
                                            {...register('fechaNacimiento')}/>
                                    </div>
                                </div>
                                <div class="form-group row mb-4">
                                    <div class="col-sm-12 text-center">
                                        <button type="submit" class="btn btn-primary">Registrarse</button>
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

export default RegistrarUsuario;