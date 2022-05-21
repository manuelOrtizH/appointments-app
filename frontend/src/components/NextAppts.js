import React, { useState, useEffect } from 'react';
import {getUser, getUserAppointments} from '../actions/api';
import Loading from '../components/common/Loading';
import OwlCarousel from 'react-owl-carousel';
import { getAllProfessionals, getAllPymes} from '../actions/api';
import './/appointments/styles/Appointments.css';
import { Link } from 'react-router-dom';
import { getDate } from './getDate';
import './Pymes.css';

const NextAppts = () => {
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [pymes, setPymes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);

    const options = {
        items: 3,
        nav: true,
        loop: false,
    };

    const listAppts = []
    
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
            const [day,month,hour] = [...getDate(new Date(appt.date))];
            listAppts.push(
                <div className="container bootstrap snippets bootdeys" key={key} >
                    <div className="row">
                        <div className="col content-card">
                            <div className="card-big-shadow">
                                <div className="card-pyme card-just-text" data-background="color" data-color="yellow" data-radius="none">
                                    <div className="content text-center">
                                        <h6 className="category">{responsable.name + ' ' + responsable.last_name}</h6>
                                        <h4 className="title"><a href="#">{pyme.name}</a></h4>
                                        <p className="description"><h4><b>{day}</b> de <b>{month}</b> a las <b>{hour}</b></h4></p>
                                        <p className='description'> <h5>{appt.reason}</h5></p>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            );
        };    
    };

    return(
        
        <div >
            {!isLoading && notCompletedAppts && 
            <div>
                <OwlCarousel style={{marginBottom: '10px'}} className='slider-items owl-theme' {...options}>
                    {listAppts}
                </OwlCarousel>
            </div>
            }
            {isLoading && <p className='text-center'><Loading/></p>}
            {!isLoading && notCompletedAppts.length == 0 && 
                <div className='text-center mt-3 mb-5'>
                    <h4 style={{color:'red'}}>No se encontraron citas proximas</h4>
                    <Link style={{color: 'blue'}} to='/appointment'>Agendar citas</Link>
                </div>
            }
        </div>
    );


};
export default NextAppts;