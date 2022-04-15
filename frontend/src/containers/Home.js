import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
const Home = () => (
    <div>
        <div className = 'jumbotron jumbotron-fluid text-white' >
            <div className='container'>
                <h1 className='display-4 text-white'>Resérvame</h1>
                <p className='lead'>Nunca antes había sido tan fácil agendar una cita.</p>
                <hr className='my-4 text-white'/>
                <p>Comienza aqui uwu.</p>
                
                <Link className='btn-main' class='btn btn-warning btn-lg' to='/login' role='button'>Avanzar</Link>
                
            </div>
        </div>
    </div>
);

export default Home;