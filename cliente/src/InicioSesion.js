import React from 'react';
import { useForm } from 'react-hook-form';

function InicioSesion() {
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        fetch('/login', {
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
        <div className="container-fluid form-margin">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Iniciar Sesión</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group row mb-4">
                                    <label htmlFor="correo" className="col-sm-3 col-form-label">Correo electrónico:</label>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control" id="correo" name="correo" required 
                                        {...register('correo')}/>
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label htmlFor="clave" className="col-sm-3 col-form-label">Contraseña:</label>
                                    <div className="col-sm-9">
                                        <input type="password" className="form-control" id="clave" name="clave" required
                                        {...register('clave')}/>
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <div className="col-sm-12 text-center">
                                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
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

export default InicioSesion;
