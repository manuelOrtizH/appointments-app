import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import '../components/common/Form.css';
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";


const Signup = ({ signup, isAuthenticated }) => {

    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>{
        e.preventDefault();
        if (password === re_password){
            signup(name, email, password, re_password);
            setAccountCreated(true);
        }
        
    };

    //Is the user authenticated
    //Redirect them to the home page
    if(isAuthenticated){
        return (<Navigate to='/' replace={true} />);
    }

    if (accountCreated){
        return (<Navigate to='/login' replace={true} />);
    }


    return (
        <div className='container'>
            <div className='mt-5 card mb-3 shadow-lg'>
                <div className='card-header text-center text-white'>
                    <h1>Registro</h1>
                    <p></p>
                </div>
                <div className='card-body'>
                    <p class="card-text text-center">Crea tu cuenta para comenzar!</p>
                    <form onSubmit={e => onSubmit(e)}>

                        <div className='form-group'>
                            <span class="card-text text-white">
                                <FaUserAlt style={{color: 'white', marginRight: '5px'}}/>
                                Nombre
                            </span>
                            <input
                                className='form-control form-field'
                                type='text'
                                placeholder='Juan Camaney'
                                name='name'
                                value={name}
                                onChange={e=>onChange(e)}
                                required
                            />
                        </div>
                        
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

                        <div className='form-group '>
                            <span class="card-text text-white mt-3">
                                <FaLock style={{color: 'white', marginRight: '5px'}}/>
                                Confirma Contraseña:
                            </span>
                            <input
                                className='form-control form-field mt-3'
                                type='password'
                                placeholder='Confirma contraseña'
                                name='re_password'
                                value={re_password}
                                onChange={e=>onChange(e)}
                                minLength='6'
                                required
                            />
                                
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col text-center'>
                                <button className='btn btn-warning btn-lg' type='submit'> Registar</button>
                            </div>
                        </div>

                    </form>
                
                    <p className='mt-4 text-center'>
                        <i>¿Ya tenías una cuenta?</i> <Link to='/login'>Ingresar</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);