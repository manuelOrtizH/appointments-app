import React from 'react';
import '../profile/styles/Profile.css';

const EditProfile = () => {
    return(
        <article className='appt-list mr-5 card  mt-5 mb-5 card-body-center'>       
             <div className='row row-cols-1 row-cols-md-2'>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            <h1 className='card-title text-center header'>Mi Perfil</h1>
                            <img src='badbunny.jpeg' className='card-img-top img-edit'></img>
                        </div>
                    </div>
                    <div className='card-body data'>
                        <form>
                            <div className='form-group input'>
                                <span class="card-text text-white">
                                    Nombre:
                                </span>
                                <input
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Ingrese su nombre'
                                    name='name'
                                    required
                                />
                            </div>

                            <div className='form-group input'>
                                <span class="card-text text-white">
                                    Apellido Paterno:
                                </span>
                                <input
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Ingrese su apellido paterno'
                                    name='plast_name'
                                    required
                                />
                            </div>

                            <div className='form-group input'>
                                <span class="card-text text-white">
                                    Apellido Materno:
                                </span>
                                <input
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Ingrese su apellido materno'
                                    name='mlast_name'
                                    required
                                />
                            </div>

                            <div className='form-group input'>
                                <span class="card-text text-white">
                                    Correo Electrónico:
                            </span>
                            <input
                                className='form-control form-field'
                                type='email'
                                placeholder='Ingrese su correo electrónico'
                                name='email'
                                required
                            />
                            </div>

                            <div className='form-group input'>
                                <span class="card-text text-white mt-3">
                                    Teléfono:
                                </span>
                                <input
                                    className='form-control form-field mt-3'
                                    type='number'
                                    placeholder='Ingrese su número telefónico'
                                    name='telefono'
                                    minLength='10'
                                    required
                                />
        
                            </div>

                            <hr></hr>
                        </form>

                        <div>
                            <button  className='btn btn-warning btn-lg btn-cancel' type='button' >Cancelar</button>
                            <button  className='btn btn-warning btn-lg btn-save' type='button' >Guardar Cambios</button>
                        </div>
                    </div>
                </div>
        </article>
    );
};

export default EditProfile;