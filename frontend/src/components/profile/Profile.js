import React, {useState, useEffect} from 'react';
import { getUser } from '../.././actions/api';
import Loading from '../common/Loading';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(false);  
    
    useEffect(async () => {
        setIsLoading(true);
        await getUser(localStorage.getItem('userId'),setUser,setAppointments);
        setIsLoading(false);
    }, []);

    const profile = user[0];

    return(
        <div>
            
            <article className='profile card  mt-5 mb-5' style={{marginRight: '5vh', marginLeft: '5vh'}}>
                <ToastContainer
                    toastClassName='text-center'
                    position='bottom-center'
                    autoClose={false}
                    closeOnClick
                    newestOnTop={false}
                    rtl={false}
                    hideProgressBar={true}
                    theme='colored'
                />
                <div>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            {!isLoading && user.length > 0 &&
                                <div>
                                    <h1 className='card-title text-center'>Mis perfil</h1>
                                    <hr></hr>
                                    
                                    <a className='card-title text-center'>
                                        <img src={profile.profile_image} style={{borderRadius: '50%', width: '20%'}}/>
                                    </a>
                                    <hr></hr>
                                    <h5 className='card-title text-center'><b>Nombre(s)</b></h5>
                                    <p className='card-title text-center'>{profile.name} </p>
                                    <hr></hr>
                                    <h5 className='card-title text-center'><b>Apellido</b></h5>
                                    <p className='card-title text-center'>{profile.last_name}</p>
                                    <hr></hr>
                                    <h5 className='card-title text-center'><b>Correo electrónico</b></h5>
                                    <p className='card-title text-center'>{profile.email}</p>
                                    <hr></hr>
                                    <h5 className='card-title text-center'><b>Telefono Celular</b></h5>
                                    <p className='card-title text-center'>{profile.phone_number} </p>
                                    <hr></hr>
                                </div>
                            }
                            {isLoading && <Loading/>}
                        </div>
                    </div>
                    <div className='card-header no-border'>
                        <div className='container'>
                            <div className='row'>
                                {isLoading && <Loading/>}
                                {!isLoading && user.length>0 &&
                                    <div className='col text-center mt-2 mb-2'>
                                        <Link 
                                            className='btn btn-warning btn-lg' 
                                            type='button' 
                                            to={{ pathname: `/profile/edit-profile/${profile.id}`}}
                                            > 
                                            Editar Perfil
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </article>
        </div>
    );
};
export default Profile;