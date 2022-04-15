import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

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
        return (<Navigate to='/' replace={true} />);
    }

    return (
        <div className='container mt-5'>
            <h1>Ingresar</h1>
            <p>Ingresa con tus credenciales</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Correo Electrónico'
                        name='email'
                        value={email}
                        onChange={e=>onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        value={password}
                        onChange={e=>onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-warning' type='submit'>Ingresar</button>
            </form>
            <p className='mt-3'>
                No tienes una cuenta? <Link to='/signup'>Registrarse</Link>
            </p>
            <p className='mt-3'>
                Olvidaste tu contrasena <Link to='/reset-password'>Cambiar Contraseña</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);