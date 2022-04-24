import React from 'react';
import '../styles/Appointments.css';
import '../../common/styles/Card.css';
import '../styles/ListAppts.css';



const ListAppt = ({pyme,reason,responsable,day,month,hour}) => {

    const showAppt = () => {
        console.log('click')
    };

    return (
        <section>
            <article className='appt' onClick={showAppt}>
                <img className='appt-icon' src='https://pbs.twimg.com/media/EEHMzFzU4AAYv1I.jpg' alt='Mark Zuckerberg'/> 
                
                <span className='main-info'>{pyme}: {reason}<span> <br></br> <i>{responsable}</i></span></span>
                <span className='date-info'>{day} {month}<span> <br></br> Hora: {hour}</span></span>
            </article>
            <hr></hr>
        </section>
        
    );

};

export default ListAppt;