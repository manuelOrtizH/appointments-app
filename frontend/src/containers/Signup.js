import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import '../components/common/styles/Form.css';
import { FaEnvelope, FaLock, FaUserAlt, FaUserTie, FaPhoneAlt } from "react-icons/fa";
import '../components/common/styles/Card.css';
import { ToastContainer, toast } from 'react-toastify';
import Alert from "sweetalert2";
import './Signup.css';




const Signup = ({ signup, isAuthenticated }) => {

    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        re_password: '',
        is_admin: false,
    });

    const { name, last_name ,email, phone_number, password, re_password, is_admin } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const phoneValidation = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        return !(!phone || regex.test(phone) === false || phone.length != 10);
    }

    const onSubmit = e =>{
        e.preventDefault();
        console.log(phoneValidation(phone_number));
        if(password !== re_password){
            toast.error('La contraseña no es igual. Asegúrate de escribir bien la contraseña.');
        }else if(!phoneValidation(phone_number)){
            toast.error('El número telefónico ingresado no es válido.');
        }else{
            signup(name, last_name, email, phone_number, password, re_password, is_admin === 'true', toast, setAccountCreated);
            Alert.fire("Cuenta creada!", `Se te redireccionará en unos momentos`, "success");
            
        }   
    };

    if(isAuthenticated){
        return (<Navigate to='/home' replace={true} />);
    }

    if (accountCreated){
        return (<Navigate to='/login' replace={true} />);
    }


    return (
        <div className='container'>
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
            <div className='mt-5 card card-form mb-3'>
                <div className='card-header card-header-form text-center text-white'>
                    <h1>Registro</h1>
                    <p></p>
                </div>
                <div className='card-body card-body-form'>
                    <p className="card-text text-center">Crea tu cuenta para comenzar!</p>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className='form-group tipo_container'>
                            <span className="card-text text-white mr-5 tipo_user">
                                Tipo de usuario:
                            </span>
                            <div className="form-check form-check-inline mr-5 tipo_cliente">
                                <input className="form-check-input" type="radio" name="is_admin" id="inlineRadio1" value= 'false' onChange={e=>onChange(e)}/>
                                <label className="form-check-label">Soy cliente</label>
                            </div>
                            <div className="form-check form-check-inline tipo_pyme">
                                <input className="form-check-input" type="radio" name="is_admin" id="inlineRadio2" value='true' onChange={e=>onChange(e)}/>
                                <label className="form-check-label">Soy admin de una PyME</label>
                            </div>
                        </div>
                        <div className='form-group'>
                            <span className="card-text text-white">
                                Nombre(s)
                            </span>
                            <input
                                className='form-control form-field'
                                type='text'
                                placeholder='Nombre'
                                name='name'
                                value={name}
                                onChange={e=>onChange(e)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <span className="card-text text-white">
                                Apellidos
                            </span>
                            <input
                                className='form-control form-field'
                                type='text'
                                placeholder='Apellidos'
                                name='last_name'
                                value={last_name}
                                onChange={e=>onChange(e)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <span className="card-text text-white">
                                Correo
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
                        <div className='form-group'>
                            <span className="card-text text-white">
                                Celular
                            </span>
                            <input
                                className='form-control form-field'
                                type='text'
                                placeholder='551122334455'
                                name='phone_number'
                                value={phone_number}
                                onChange={e=>onChange(e)}
                                required
                            />
                        </div>
                        
                        <div className='form-group'>
                            <span className="card-text text-white">
                                Contraseña
                            </span>
                            <input
                                className='form-control form-field'
                                type='password'
                                placeholder='Contraseña'
                                name='password'
                                value={password}
                                onChange={e=>onChange(e)}
                                minLength='6'
                                required
                            />
                                
                        </div>

                        <div className='form-group'>
                            <span className="card-text text-white">
                                Contraseña
                            </span>
                            <input
                                className='form-control form-field'
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