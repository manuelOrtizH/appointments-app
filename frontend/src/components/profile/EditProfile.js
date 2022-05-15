import React, {useState, useEffect} from 'react';
import { getUser } from '../.././actions/api';
import Loading from '../common/Loading';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserAlt, FaUserTie } from "react-icons/fa";
import { getUserClient } from '../.././actions/api';

const EditProfile = () => {
    const { id } = useParams();
    
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(async () => {
        setIsLoading(true);
        await getUserClient(id,setUser);
        setIsLoading(false);
    }, []);

    const profile = user;

    const [formData, setFormData] = useState({
        name: profile.name,
        last_name: profile.last_name,
        email: profile.email,
        phone_number: profile.phone_number,
    });

    const { name, last_name, email, phone_number } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const onSubmit = e =>{
        e.preventDefault();
        // if (password === re_password){
        //     signup(name, email, password, re_password);
        //     setAccountCreated(true);
        // }
        
    };

    return(
        <div>
            
            <article className='profile card  mt-5 mb-5' style={{marginRight: '5vh', marginLeft: '5vh'}}>
                    <div className='card-header mb-4'>

                    <h1 className='card-title  text-center'>Editar mi perfil</h1>
                    </div>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            {!isLoading && user && 
                            <div>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className='form-group'>
                                    <span className="card-text text-white">
                                        <FaUserAlt style={{color: 'white', marginRight: '5px'}}/>
                                        Nombre(s)
                                    </span>
                                    <input
                                        className='form-control form-field'
                                        type='text'
                                        placeholder={name}
                                        name='name'
                                        value={name}
                                        onChange={e=>onChange(e)}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <span className="card-text text-white">
                                        <FaUserAlt style={{color: 'white', marginRight: '5px'}}/>
                                        Apellidos
                                    </span>
                                    <input
                                        className='form-control form-field'
                                        type='text'
                                        placeholder={last_name}
                                        name='last_name'
                                        value={last_name}
                                        onChange={e=>onChange(e)}
                                        required
                                    />
                                </div>
                                
                                <div className='form-group'>
                                    <span className="card-text text-white">
                                        <FaEnvelope style={{color: 'white', marginRight: '5px'}}/>
                                        Correo Electrónico:
                                    </span>
                                    <input
                                        className='form-control form-field'
                                        type='email'
                                        placeholder={email}
                                        name='email'
                                        value={email}
                                        onChange={e=>onChange(e)}
                                        required
                                    />
                                </div>
                                
                                <div className='form-group'>
                                    <span className="card-text text-white">
                                        <FaEnvelope style={{color: 'white', marginRight: '5px'}}/>
                                        Telefono
                                    </span>
                                    <input
                                        className='form-control form-field'
                                        type='text'
                                        placeholder={phone_number}
                                        name='phone_number'
                                        value={phone_number}
                                        onChange={e=>onChange(e)}
                                        required
                                    />
                                </div>

                                <hr></hr>
                                <div className='row'>
                                    <div className='col text-center mt-2 mb-2'>
                                        <button
                                            className='btn btn-success btn-lg mr-5' 
                                            type='submit' 
                                            to='/profile'>
                                            Guardar Cambios
                                        </button>
                                        <Link
                                            className='btn btn-danger btn-lg ml-5' 
                                            type='button' 
                                            to='/profile'>
                                            Cancelar Cambios
                                        </Link>
                                    </div>
                                </div>

                            </form>
                            
                                         
                        </div>
                        }
                        {isLoading && <Loading/>}
                    </div>
                    
                   
                </div>

                
            </article>
        </div>
    );
};
export default EditProfile;