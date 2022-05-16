import React, { useState, useEffect } from 'react';
import {getUser, getUserAppointments} from '../actions/api';
import Loading from '../components/common/Loading';
import OwlCarousel from 'react-owl-carousel';
import { getAllProfessionals, getAllPymes} from '../actions/api';
import './/appointments/styles/Appointments.css';

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
                        <h5 className='card-title text-center nextApptsTitle'>{pyme.name}</h5>
                        <span>{responsable.name}</span> <span>{responsable.last_name}</span> <br></br>
                        <span>{appt.date}</span>
                        
                    </div>
                </div>
            );
        };    
    };

    return(
        <div class="nextAppts">
            {!isLoading && notCompletedAppts && 
            <div>
                <OwlCarousel className='slider-items owl-theme' {...options}>
                    {listPymes}
                </OwlCarousel>
            </div>
            }
            {isLoading && <Loading/>}
            {!isLoading && notCompletedAppts.length == 0 && 
                <div className='text-center mb-5'>
                    No se encontraron citas proximas
                </div>
            }
        </div>
    );


};
export default NextAppts;