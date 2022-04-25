import React, { useState, useEffect } from 'react';
import '../styles/Appointments.css';
import '../../common/styles/Card.css';
import { 
    getUser, 
    getUserAppointments} from '../../../actions/api';
import axios from 'axios';
import ListAppt from './ListAppt';
import Loading from '../../common/Loading';

const CardAppts = ({date,month, appointments, professionals, pymes}) => {
    const [isLoading, setIsLoading] = useState(false);
    const listAppointmentsItems = [];
    const dayFormatter = new Intl.DateTimeFormat('es', {day: '2-digit'});
    const monthFormatter = new Intl.DateTimeFormat('es', {month: 'long'});
    const hourFormatter = new Intl.DateTimeFormat('es', {hour: '2-digit', minute: '2-digit'})
    let eventKey = 0
    for (const [key, appt] of Object.entries(appointments)) {
        const apptDate = new Date(appt.date);
        const pyme = pymes.filter(el=> el.id === appt.pyme)[0]
        const responsable = professionals.filter(el=>el.id === appt.responsable)[0]
        
        
        listAppointmentsItems.push( 
            <div key={key}>
                <ListAppt
                    pyme={pyme.name}
                    reason={appt.reason}
                    responsable={`${responsable.name} ${responsable.last_name}`}
                    day={dayFormatter.format(apptDate)}
                    month={monthFormatter.format(apptDate)}
                    hour={hourFormatter.format(apptDate)}
                    imageUrl={pyme.image_url}
                    customForm={appt.data}
                />
            </div>
        );
        eventKey+=1;
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