import React from 'react';
import '../styles/Appointments.css';
import { createApptFragments } from '../../../actions/createApptsCard';

const History = ({appointments, professionals, pymes, user, isAdmin}) => {
    
    const completedAppointments = appointments.filter(el=>el.completed);
    const listAppointmentsItems = createApptFragments(completedAppointments, pymes, professionals, true, user);

    
    return (
        <article className='appt-data ml-5 card mr-5 mt-5' >
            <div>
                <div className='card-body'>
                    <div className=' text-center'>
                        <h1 className='card-title text-center'>Mi historial</h1>
                        <hr></hr>
                    </div>
                    <div>
                        {completedAppointments.length === 0 && <p className='text-center'>Aún no has completado una cita</p>}
                        {completedAppointments.length > 0 && 
                            listAppointmentsItems
                        }
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

export default History;