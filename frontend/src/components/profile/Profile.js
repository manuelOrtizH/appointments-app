import React from 'react';
import '../profile/styles/Profile.css';

const Profile = () => {
    return(
        <article className='appt-list mr-5 card  mt-5 mb-5 card-body-center'>       
             <div className='row row-cols-1 row-cols-md-2'>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            <h1 className='card-title text-center header'>Mi Perfil</h1>
                            <img src='badbunny.jpeg' className='card-img-top img'></img>
                        </div>
                    </div>
                    <div className='card-body data'>
                        <div>
                            <h4>Nombre:</h4>
                            <h4 className='h4'>Manuelito</h4>
                            <hr className='hr'></hr>
                            <h4>Apellido Paterno:</h4>
                            <h4 className='h4'>Solari</h4>
                            <hr className='hr'></hr>
                            <h4>Apellido Materno:</h4>
                            <h4 className='h4'>Herrera</h4>
                            <hr className='hr'></hr>
                            <h4>Teléfono:</h4>
                            <h4 className='h4'>667283992939</h4>
                            <hr className='hr'></hr>
                            <h4>Correo:</h4>
                            <h4 className='h4'>manuelitodekren@gmail.com</h4>
                            <hr className='hr'></hr>
                        </div>
                        <div>
                            <button  className='btn btn-warning btn-lg btn-edit' type='button' >Editar Perfil</button>
                        </div>
                    </div>
                </div>
        </article>
    );
};

export default Profile;