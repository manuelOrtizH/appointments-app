import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import '../containers/Home.css';
import BusinessLine from './businessLine/BusinessLine';
import NextAppts from './NextAppts';
import Pymes from './Pymes';
import { getUser, getUserAppointments, getAllProfessionals, getAllPymes, getAllBusinessLines } from '../actions/api';

const Dashboard = ({isAuthenticated}) => {
    let userName = '';
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [businessLines, setBusinessLines] = useState([]);
    const [pymes, setPymes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);



    useEffect(async() => {
        setIsLoading(true);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments); 
        await getUserAppointments(setUserAppts);
        await getAllProfessionals(setProfessionals);
        await getAllPymes(setPymes);
        await getAllBusinessLines(setBusinessLines);
        setIsLoading(false);
    }, []);

    

    if(!isAuthenticated){
        return (<Navigate to='/' replace={true} />);
    }else{
        userName = localStorage.getItem('userName');
    };

    return(
        <div>
            <div className = 'jumbotron jumbotron-fluid text-white' >
                <div className='container'>
                    <h1 className='display-4 text-white'>Hola, {userName} !</h1>                
                </div>
            </div>
            {/* Desplegar citas */}
            <div className='container'>
                <h1 style={{fontWeight: 'bold'}} className='text-black text-center'>Próximas citas</h1>
            </div>
            <NextAppts
                userAppts={userAppts}
                appointments={appointments} 
                professionals={professionals} 
                pymes={pymes}
            />
            <hr></hr>
            {/* Agendar Citas con distintas PyMEs */}
            <div className='container'>
                <h1 style={{fontWeight: 'bold'}} className='text-black text-center mb-5'>Busca PyMEs de conveniencia para agendar citas</h1>
            </div>           
            <Pymes
                pymes={pymes}
            />
            <hr></hr>
            {/* Explora los difgerentes pymes */}
            <div className='container'>
                <h1 style={{fontWeight: 'bold'}} className='text-black text-center mt-5'>Explora los diferentes sectores que puedes encontrar</h1>
            </div>           
            <BusinessLine
                businessLines={businessLines}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Dashboard);