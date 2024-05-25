import './registro.css'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function RegistrarUsuario() {
    const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm();
    const [errorValidacion, setErrorValidacion] = useState(false)
    const [errorRegistro, setErrorRegistro] = useState(false)

    function onSubmit(data) {
        if (data.clave.length < 8) {
            setErrorValidacion(true)
        } else {
            setErrorValidacion(false)
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = "http://localhost:3030"
                    } else {
                        setErrorRegistro(true)
                    }
                })
                .catch(error => {
                    console.error('Error al realizar la solicitud:', error);
                    setErrorRegistro(true)
                });
        }
    }

    const password = watch('clave');

    useEffect(() => {
        if (password && password.length < 8) {
            setError('clave', { type: 'manual', message: 'La contraseña debe tener al menos 8 caracteres.' });
        } else {
            clearErrors('clave');
        }
    }, [password, setError, clearErrors]);

    return (
        <div className="container-fluid form-margin">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Registro</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group row mb-4">
                                    <label htmlFor="nombre" className="col-sm-3 col-form-label">Nombre:</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="nombre" name="nombre" required {...register('nombre')} />
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label htmlFor="apellidos" className="col-sm-3 col-form-label">Apellidos:</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="apellidos" name="apellidos" required {...register('apellidos')} />
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label htmlFor="correo" className="col-sm-3 col-form-label">Correo electrónico:</label>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control" id="correo" name="correo" required {...register('correo')} />
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label htmlFor="clave" className="col-sm-3 col-form-label">Clave:</label>
                                    <div className="col-sm-9">
                                        <input type="password" className="form-control" id="clave" name="clave" required {...register('clave')} />
                                    </div>
                                    <div className="col-sm-9 offset-sm-3 mt-2">
                                        {errors.clave && (
                                            <span className='alert alert-danger d-block'>{errors.clave.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label htmlFor="fechaNacimiento" className="col-sm-3 col-form-label">Fecha de nacimiento:</label>
                                    <div className="col-sm-9">
                                        <input type="date" className="form-control" id="fechaNacimiento" name="fechaNacimiento" required {...register('fechaNacimiento')} />
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <div className="col-sm-12 text-center">
                                        <button type="submit" className="btn btn-primary">Registrarse</button>
                                    </div>
                                </div>
                                {errorRegistro && (
                                    <div className="form-group row mb-4">
                                        <div className="col-sm-12">
                                            <span className='alert alert-danger d-block'>Ya existe un usuario con ese correo</span>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarUsuario;