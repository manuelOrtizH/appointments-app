import React from 'react';
import '../containers/Home.css';
import { Link } from 'react-router-dom';
import BusinessLine from './businessLine/BusinessLine';
import NextAppts from './NextAppts';

const Dashboard = () => {
    const userName = localStorage.getItem('userName');
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

export default Dashboard;