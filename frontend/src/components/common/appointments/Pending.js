import React, { useState, useEffect } from 'react';
import '../styles/Appointments.css';
import '../styles/Card.css';
import { createApptFragments } from '../../../actions/createApptsCard';


const Pending = ({date,month, appointments, professionals, pymes, user, allAppointments, isAdmin, clients}) => {
    const [isLoading, setIsLoading] = useState(false);
    const notCompletedAppts = appointments.filter(el=> !el.completed);
    const listAppointmentsItems = createApptFragments(notCompletedAppts, pymes, professionals, false, user, isAdmin, clients);
    

    return (
        <article className='appt-list mr-5 card  mt-5 mb-5'>
            <div>

                <div className='card-body'>
                    <div className='no-border text-center'>
                        <div className='calendar-badge'>
                                <span className='badge-day'>{date}</span>
                                <span className='badge-month'>{month}</span>
                        </div>
                        <div className='row'>
                            <div className='col text-left mt-5 mr-5'>
                                <h1 className='card-title text-center'>Mis Próximas Citas</h1>
                            </div>
                            <div className='col text-right mt-5 mr-3'>
                                <button className='btn btn-warning btn-lg d-none' type='button' > Agendar Más Citas</button>
                            </div>
                        </div>
                        
                        <hr></hr>
                    </div>
                    <div>
                        {listAppointmentsItems.length > 0 && listAppointmentsItems }
                        {listAppointmentsItems.length === 0 && <p className='text-center'>No se encontraron citas...</p> }
                    </div>
                </div>
                <div className='card-header no-border'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col text-center mt-2 mb-2'>
                                <button className='btn btn-warning btn-lg d-none' type='button' > Agendar Más Citas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </article>
    );
};

export default Pending;