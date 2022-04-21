import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import '../components/common/Form.css';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Logo } from '../components/common/Logo';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>{
        e.preventDefault();

        login(email,password);
    };

    //Is the user authenticated
    //Redirect them to the home page
    if(isAuthenticated){
        return (<Navigate to='/home' replace={true} />);
    }

    return (
        <div className='container'>
            <div className='mt-5 card card-form mb-3'>
                <div className='card-header card-header-form text-center text-white'>

                    <h1 className='mt-3'>Ingresar</h1>
                    
                </div>
                <div className='card-body card-body-form'>
                    <p class="card-text text-center">Ingresa con tus credenciales</p>
                    <form onSubmit={e => onSubmit(e)}>
                        
                        <div className='form-group'>
                            <span class="card-text text-white">
                                <FaEnvelope style={{color: 'white', marginRight: '5px'}}/>
                                Correo Electrónico:
                            </span>
                            <input
                                className='form-control form-field'
                                type='email'
                                placeholder='micorreo@dominio.com'
                                name='email'
                                value={email}
                                onChange={e=>onChange(e)}
                                required
                            />
                        </div>
                        
                        <div className='form-group '>
                            <span class="card-text text-white mt-3">
                                <FaLock style={{color: 'white', marginRight: '5px'}}/>
                                Contraseña:
                            </span>
                            <input
                                className='form-control form-field mt-3'
                                type='password'
                                placeholder='Contraseña'
                                name='password'
                                value={password}
                                onChange={e=>onChange(e)}
                                minLength='6'
                                required
                            />
                                
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col text-center'>
                                <button className='btn btn-warning btn-lg' type='submit'> Ingresar</button>
                            </div>
                        </div>

                    </form>
                
                    <p className='mt-3 text-center'>
                        <i>¿Aún no cuentas con una cuenta?</i> <Link to='/signup'>Registrarse</Link>
                    </p>
                    {/* <p className='mt-3 text-center'>
                        ¿Olvidaste tu contraseña? <Link to='/reset-password'>Cambiar Contraseña</Link>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);