import React from 'react';
import '../profile/styles/Profile.css';

const Profile = () => {
    return(
        <article className='appt-list mr-5 card  mt-5 mb-5 card-body-center'>       
             <div className='row row-cols-1 row-cols-md-2'>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            <h1 className='card-title text-center header'>Mi Perfil</h1>
                            <img src='badbunny1.jpeg' className='card-img-top img'></img>
                        </div>
                    </div>
                    <div className='card-body data'>
                        <form>
                            <label for='name'>Nombre:</label>
                            <h4 className='h4'>Manuelito</h4>
                            <hr className='hr'></hr>
                            <label>Apellido Paterno:</label>
                            <h4 className='h4'>siuuuu</h4>
                            <hr className='hr'></hr>
                            <label>Apellido Materno:</label>
                            <h4 className='h4'>Herrera</h4>
                            <hr className='hr'></hr>
                            <label>Teléfono:</label>
                            <h4 className='h4'>667283992939</h4>
                            <hr className='hr'></hr>
                            <label>Correo:</label>
                            <h4 className='h4'>manuelitodekren@gmail.com</h4>
                            <hr className='hr'></hr>
                        </form>
                        <div>
                            <button  className='btn btn-warning btn-lg btn-edit' type='button' >Editar Perfil</button>
                        </div>
                    </div>
                </div>
        </article>
    );
};

export default Profile;