import React, {useState, useEffect} from 'react';
import { getUser, handleUser } from '../.././actions/api';
import Loading from '../common/Loading';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import ModalProfile from './ModalProfile';
import Alert from 'sweetalert2';

const Profile = () => {
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(false);  
    const [modal, setModal] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const toggle = () => setModal({ modal: !modal.modal });
    useEffect(async () => {
        setIsLoading(true);
        await getUser(localStorage.getItem('userId'),setUser,setAppointments);
        setIsLoading(false);
    }, []);

    const profile = user[0];

    const phoneValidation = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        return !(!phone || regex.test(phone) === false || phone.length != 10);
    };

    const handleSubmit = (formData, toast) =>{
        console.log(formData);
        if(!phoneValidation(formData.phone_number)){
            toast.error('El número telefónico ingresado no es válido.');
        }else{
            profile.name = formData.name;
            profile.last_name = formData.last_name;
            profile.phone_number = formData.phone_number;
            profile.profile_image = formData.profile_image;
            handleUser(profile, toast);
            toggle();
            Alert.fire("Perfil Editado!", `Tus cambios se han hecho con éxito`, "success");
        }   
    };

    const handleModal = (item) => setModal({ apptForm: user[0], modal: !modal.modal });

    

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
                                        <Avatar alt="Remy Sharp" src={profile.profile_image} style={{marginLeft: '47%', alignSelf: 'center'}} sx={{ width: 90, height: 90 }}/>
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
                                    <h5 className='card-title text-center'><b>Teléfono Celular</b></h5>
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
                                {!isLoading && user.length>0 &&
                                    <div className='col text-center mt-2 mb-2'>
                                        <button onClick={handleModal} className='btn btn-warning'>Editar Perfil</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </article>
            {modal.modal ? (
                <ModalProfile
                    activeItem={modal.activeItem}
                    toggle={toggle}
                    onSave={handleSubmit}
                    customForm={user[0]}
                    isEdit={true}
                />
            ) : null}
        </div>
    );
};
export default Profile;