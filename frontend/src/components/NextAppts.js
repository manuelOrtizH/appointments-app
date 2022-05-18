import React, { useState, useEffect } from 'react';
import {getUser, getUserAppointments} from '../actions/api';
import Loading from '../components/common/Loading';
import OwlCarousel from 'react-owl-carousel';
import { getAllProfessionals, getAllPymes} from '../actions/api';
import './/appointments/styles/Appointments.css';
import { Link } from 'react-router-dom';

const NextAppts = () => {
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [pymes, setPymes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);
    const dayFormatter = new Intl.DateTimeFormat('es', {day: '2-digit'});
    const monthFormatter = new Intl.DateTimeFormat('es', {month: 'long'});
    const hourFormatter = new Intl.DateTimeFormat('es', {hour: '2-digit', minute: '2-digit'})
    const options = {
        items: 3,
        nav: true,
        loop: true,
    };
    const listPymes = []
    
    useEffect(async() => {
        setIsLoading(true);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments); 
        await getUserAppointments(setUserAppts);
        await getAllProfessionals(setProfessionals);
        await getAllPymes(setPymes);
        setIsLoading(false);
    }, []);

    const notCompletedAppts = userAppts ? userAppts.filter(el => !el.completed && appointments.includes(el.id)) : [];

    if (!isLoading){
        for (const [key,appt] of Object.entries(notCompletedAppts)){
            const responsable = professionals.filter(el=> appt.responsable==el.id)[0];
            const pyme = pymes.filter(el=> appt.pyme==el.id)[0];
            listPymes.push(
                <div className='card-body' key={key}>
                    <div className='no-border text-center'>
                        <h4 className='card-title text-center nextApptsTitle'>{pyme.name}</h4>
                        <span><h5>{appt.date}</h5></span> <br></br>
                        <span>{appt.reason}</span> <br></br>
                        <span>{responsable.name}</span> <span>{responsable.last_name}</span> <br></br>
                        
                        
                    </div>
                </div>
            );
        };    
    };

    return(
        <div className="nextAppts">
            {!isLoading && notCompletedAppts && 
            <div>
                <OwlCarousel className='slider-items owl-theme' {...options}>
                    {listPymes}
                </OwlCarousel>
            </div>
            }
            {isLoading && <p className='text-center'><Loading/></p>}
            {!isLoading && notCompletedAppts.length == 0 && 
                <div className='text-center mt-3 mb-5'>
                    <h4 style={{color:'red'}}>No se encontraron citas proximas</h4>
                    <Link style={{color: 'blue'}} to='/appointment'>Agendar citas</Link>
                </div>
            }
        </div>
    );


};
export default NextAppts;