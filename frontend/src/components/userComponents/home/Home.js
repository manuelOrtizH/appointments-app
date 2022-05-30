import React from 'react';
import BusinessLine from '../businessLine/BusinessLine';
import NextAppts from '../../common/NextAppts';
import Pymes from '../pyme/PymesCarousel';

const Home = ({username, pymes, userAppts, professionals, appointments, businessLines}) => {

    console.log(pymes);

    return(
        <div>
            {/* Desplegar citas */}
            <div className='container'>
                <h1 style={{fontWeight: 'bold'}} className='text-black text-center'>Próximas citas</h1>
            </div>
            <NextAppts 
                userAppts={userAppts}
                professionals={professionals} 
                appointments={appointments}
                pymes={pymes}
                isAdmin={false}
            />
            <hr></hr>
            {/* Agendar Citas con distintas PyMEs */}
            <div className='container'>
                <h1 style={{fontWeight: 'bold'}} className='text-black text-center mb-5'>Busca PyMEs de conveniencia para agendar citas</h1>
            </div>           
            <Pymes pymes={pymes}
            />
            <hr></hr>
            {/* Explora los difgerentes pymes */}
            <div className='container'>
                <h1 style={{fontWeight: 'bold'}} className='text-black text-center mt-5'>Explora los diferentes sectores que puedes encontrar</h1>
            </div>           
            <BusinessLine 
                businessLines={businessLines} 
                pymes={pymes}
            />
        </div>
    );
};
export default Home;