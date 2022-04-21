import React, { useState, useEffect } from 'react';
import '../styles/Appointments.css';
import '../../common/styles/Card.css';
import { 
    getUser, 
    getUserAppointments, 
    getAllPymes, 
    getAppointmentsProfessionals } from '../../../actions/api';
import axios from 'axios';
import ListAppt from './ListAppt';
import Loading from '../../common/Loading';

const CardAppts = ({date,month}) => {
    const [user, setUser] = useState({});
    const [appointmentInfo, setAppointmentInfo] = useState({});
    const [pymes, setPymes] = useState({});
    const [professionals, setProfessionals] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const listAppointmentsItems = [];
    
    useEffect(async () => {
        setIsLoading(true);        
        await getUser(localStorage.getItem('userId'),setUser);
        await getUserAppointments(user.appointments, setAppointmentInfo);
        const professionalsIds = await appointmentInfo.map(el => el.responsable);
        await getAppointmentsProfessionals(professionalsIds,setProfessionals);
        await getAllPymes(setPymes);      
        setIsLoading(false);
    }, []);
    
    console.log('Retrieved: ', professionals);


    return (
        <article className='appt-list mr-5 card  mt-5 mb-5'>
             
             {!isLoading && <div>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            <div className='calendar-badge'>
                                    <span className="badge-day">{date}</span>
                                    <span className="badge-month">{month}</span>
                            </div>
                            <h1 className='card-title text-center'>Mis citas</h1>
                            <hr></hr>
                        </div>
                        <div>
                            {listAppointmentsItems}
                        </div>
                    </div>
                    <div className='card-header no-border'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col text-center mt-2 mb-2'>
                                    <button className='btn btn-warning btn-lg' type='button'> Agendar Mas Citas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isLoading && <Loading/>}
        </article>
    );
};

export default CardAppts;