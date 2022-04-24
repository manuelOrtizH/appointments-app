import React, { useState, useEffect } from 'react';
import '../styles/Appointments.css';
import '../../common/styles/Card.css';
import { 
    getUser, 
    getUserAppointments} from '../../../actions/api';
import axios from 'axios';
import ListAppt from './ListAppt';
import Loading from '../../common/Loading';

const CardAppts = ({date,month, appointments}) => {
    const [isLoading, setIsLoading] = useState(false);
    const listAppointmentsItems = [];

    for (const [key, appt] of Object.entries(appointments)) {
        const apptDate = new Date(appt.date);
        const dayFormatter = new Intl.DateTimeFormat('es', {day: '2-digit'});
        const monthFormatter = new Intl.DateTimeFormat('es', {month: 'long'});
        const hourFormatter = new Intl.DateTimeFormat('es', {hour: '2-digit', minute: '2-digit'})
        listAppointmentsItems.push( 
            <div key={key}>
                <ListAppt
                    pyme={'Pyme'}
                    reason={appt.reason}
                    responsable={' '}
                    day={dayFormatter.format(apptDate)}
                    month={monthFormatter.format(apptDate)}
                    hour={hourFormatter.format(apptDate)}
                />
            </div>
        );
    };
    

    return (
        <article className='appt-list mr-5 card  mt-5 mb-5'>
             
             <div>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            <div className='calendar-badge'>
                                    <span className='badge-day'>{date}</span>
                                    <span className='badge-month'>{month}</span>
                            </div>
                            <h1 className='card-title text-center'>Mis citas</h1>
                            <hr></hr>
                        </div>
                        <div>
                        {!isLoading && listAppointmentsItems.length > 0 && listAppointmentsItems }
                        {!isLoading && listAppointmentsItems.length === 0 && <p className='text-center'>No se encontraron citas...</p> }
                        {isLoading && <Loading/>}
                        </div>
                    </div>
                    <div className='card-header no-border'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col text-center mt-2 mb-2'>
                                    <button className='btn btn-warning btn-lg' type='button' > Agendar Más Citas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            
        </article>
    );
};

export default CardAppts;