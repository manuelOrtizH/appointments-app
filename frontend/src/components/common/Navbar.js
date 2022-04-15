import React, { Fragment } from 'react';
import './Navbar.css'
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

const Navbar = ({ logout, isAuthenticated }) => {

    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link to="/login" className="nav-link text-white">Ingresar</Link>
            </li>
            <li className="nav-item">
                <Link to="/signup" className="nav-link text-white">Registrarse</Link>
            </li>
            
    
    


        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <li className="nav-item">
                <a href="#" className="nav-link text-white">Perfil</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link text-white">Citas</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link text-white">Historial</a>
            </li>

        </Fragment>

    );

    const noDisplay = () => (
        <Fragment></Fragment>
    );

    const displayLogout = () => (
        <Fragment>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-auto">
                        <a href="#" className="nav-link text-white mr-auto" onClick={logout} >Salir</a>
                    </li>
                </ul>
            </div>

        </Fragment>
    );

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light text-black shadow-lg " id="ftco-navbar">
    
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa fa-bars"></span> Menu
                </button>
                <div className="collapse navbar-collapse ml-5" id="ftco-nav">
                <Logo></Logo>
                    <ul className="navbar-nav ">
                        
                        <li className="nav-item ">
                            <Link to="/" className="nav-link text-white">Home</Link>
                        </li>
                        {isAuthenticated ? authLinks(): guestLinks()}
     

                        
                    </ul>

                    {isAuthenticated ? displayLogout(): noDisplay()}


                </div>
                
            </nav>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);