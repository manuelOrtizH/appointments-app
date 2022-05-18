import React from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import '../containers/Home.css';
import BusinessLine from './businessLine/BusinessLine';
import NextAppts from './NextAppts';

const Dashboard = ({isAuthenticated}) => {
    let userName = '';

    if(!isAuthenticated){
        return (<Navigate to='/' replace={true} />);
    }else{
        userName = localStorage.getItem('userName');
    }

    return(
        <div>
            <div className = 'jumbotron jumbotron-fluid text-white' >
                <div className='container'>
                    <h1 className='display-4 text-white'>Hola, {userName} !</h1>                
                </div>
            </div>
            <div className='container'>
                <h2 className='text-black text-center'>Próximas citas</h2>
            </div>
            {/* Desplegar citas */}
            <NextAppts/>
            <div className='container'>
                <h2 className='text-black text-center'>Explora los diferentes sectores que puedes encontrar.</h2>
            </div>
            {/* Explora los difgerentes pymes */}
            <BusinessLine/>
     
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Dashboard);