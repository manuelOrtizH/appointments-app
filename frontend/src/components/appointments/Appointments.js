import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserData from './UserData';
import ListAppts from './ListAppts';

const Appointment = () => {
    const months = {1: 'Enero', 2: ''}
    const [isLoading, setIsLoading] = useState(false);

    const newDate = new Date()
    const date = newDate.getDate();
    const formatter = new Intl.DateTimeFormat('es', { month: 'short' });
    const month = formatter.format(new Date());
    const year = newDate.getFullYear();
    const today = `${date} / ${month<10?`0${month}`:`${month}`} / ${year}`
    

    useEffect(async() => {

    }, []);

    return(
        <div className='centered '>
 
            <section className='cards' style={{display: 'flex', border: 'transparent'}}>
                <UserData/>
                <ListAppts 
                    date={date}
                    month={month}
                />

            </section>
        </div>
    );
};

export default Appointment;
