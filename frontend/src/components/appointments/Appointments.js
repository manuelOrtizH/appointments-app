import React, { useState, useEffect } from 'react';
import { getAllProfessionals, getUser, getUserAppointments } from '../../actions/api';
import UserData from './cardUserData/CardUserData';
import CardAppts from './cardAppointments/CardAppts';
import CarouselPymes from './pymesAppointments/CarouselPymes';
import Loading from '../common/Loading';

const Appointment = () => {
    const [professionals, setProfessionals] = useState([]);
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);
    const newDate = new Date()
    const date = newDate.getDate();
    const formatter = new Intl.DateTimeFormat('es', { month: 'short' });
    const month = formatter.format(new Date());
    const year = newDate.getFullYear();
    const today = `${date} / ${month<10?`0${month}`:`${month}`} / ${year}`
    

    useEffect(async() => {
        setIsLoading(true);
        await getAllProfessionals(setProfessionals);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments); 
        await getUserAppointments(setUserAppts);
        setIsLoading(false);
    }, []);

    const filteredAppts = userAppts.filter(el=>appointments.includes(el.id))
    

    return(
        <div className='centered '>
            
            
            {!isLoading &&
                <div>
                    <section className='cards' style={{display: 'flex', border: 'transparent'}}>
                        <UserData/>
                    
                        <CardAppts 
                            date={date}
                            month={month}
                            appointments={filteredAppts}
                        />
                    </section>
                    <h3 className='text-center'>Explora las diferentes PyMEs</h3>
                    <CarouselPymes professionals={professionals} appointments={filteredAppts} user={user}/>
                </div>
            }
            {isLoading && <Loading/>}
        </div>
    );
};

export default Appointment;
