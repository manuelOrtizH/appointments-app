import React, { useState, useEffect } from 'react';
import {getUser, getUserAppointments, getAllProfessionals, getAllPymes} from '../../actions/api';
import Loading from '../common/Loading';
import OwlCarousel from 'react-owl-carousel';
import './styles/Appointments.css';
import { Link } from 'react-router-dom';
import { getDate } from '../../actions/date';
import '../userComponents/pyme/styles/Pymes.css';

const NextAppts = ({userAppts, professionals, appointments, pymes, isAdmin, clients}) => {
    const [isLoading, setIsLoading] = useState(false);
    

    const options = {
        items: 3,
        nav: true,
        loop: false,
    };

    const listAppts = []
    
    useEffect(() => {
        setIsLoading(true);
        setIsLoading(false);
    }, []);

    const notCompletedAppts = userAppts.filter(el => !el.completed && appointments.includes(el.id));

    if (!isLoading){
        for (const [key,appt] of Object.entries(notCompletedAppts)){
            const responsable = professionals.filter(el=> appt.responsable==el.id)[0];
            const pyme = pymes.filter(el=> appt.pyme==el.id)[0];
            const [day,month,hour] = [...getDate(new Date(appt.date))];
            const color = isAdmin ? 'yellow' : 'blue'
            let client = '';
            if(isAdmin){
                client = clients ? clients.filter(el => el.appointments.includes(appt.id))[0] : false; 
            };
            listAppts.push(
                <div className="container bootstrap snippets bootdeys" key={key} >
                    <div className="row">
                        <div className="col content-card">
                            <div className="card-big-shadow">
                                <div className="card-pyme card-just-text" data-background="color" data-color={color} data-radius="none">
                                    <div className="content text-center">
                                        <h6 className="category">{responsable.name + ' ' + responsable.last_name}</h6>
                                        <h4 className="title"><a href="#">{pyme.name}</a></h4>
                                        <h4 className='description'><b>{day}</b> de <b>{month}</b> a las <b>{hour}</b></h4>
                                        <h5 className='description'>{appt.reason}</h5>
                                        {isAdmin && 
                                            <h5 className='category'>Cliente : {client ? client.name + ' ' + client.last_name : ' '}</h5>
                                        }
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
            {isLoading && <div className='text-center'><Loading/></div>}
            {!isLoading && notCompletedAppts.length == 0 && 
                <div className='text-center mt-3 mb-5'>
                    <h4 style={{color:'red'}}>No se encontraron citas proximas</h4>
                    {!isAdmin && <Link style={{color: 'blue'}} to='/appointment'>Ver citas</Link>}
                </div>
            }
        </div>
    );


};
export default NextAppts;