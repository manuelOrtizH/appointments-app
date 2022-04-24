import React, { useState, useEffect } from 'react';
import { getAllProfessionals, getUser } from '../../actions/api';
import UserData from './cardUserData/CardUserData';
import CardAppts from './cardAppointments/CardAppts';
import CarouselPymes from './pymesAppointments/CarouselPymes';


const Appointment = () => {
    const [professionals, setProfessionals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const newDate = new Date()
    const date = newDate.getDate();
    const formatter = new Intl.DateTimeFormat('es', { month: 'short' });
    const month = formatter.format(new Date());
    const year = newDate.getFullYear();
    const today = `${date} / ${month<10?`0${month}`:`${month}`} / ${year}`
    

    useEffect(async() => {
        setIsLoading(true);
        await getAllProfessionals(setProfessionals);
        setIsLoading(false);
    }, []);

    return(
        <div className='centered '>
            
            
        
            <section className='cards' style={{display: 'flex', border: 'transparent'}}>
                <UserData/>
            
                <CardAppts 
                    date={date}
                    month={month}
                />
            </section>
            <h3 className='text-center'>Explora las diferentes PyMEs</h3>
            <CarouselPymes professionals={professionals}/>
            
        </div>
    );
};

export default Appointment;