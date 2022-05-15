import React, { useState, useEffect } from 'react';
import {getUser, getUserAppointments} from '../actions/api';
import Loading from '../components/common/Loading';

const NextAppts = () => {
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);
    const listPymes = []


    useEffect(async() => {
        setIsLoading(true);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments); 
        await getUserAppointments(setUserAppts);
        setIsLoading(false);
    }, []);

    const notCompletedAppts = userAppts.filter(el => !el.completed && appointments.includes(el.id));

    console.log(notCompletedAppts);

    return(
        <div>
            {!isLoading && notCompletedAppts && 
            // AQUI OMI PUTO
            <div>Proximas Citas Componentes</div>
            }
            {isLoading && <Loading/>}
            {!isLoading && notCompletedAppts.length == 0 && 
                <div className='text-center mb-5'>
                    No se encontraron citas proximas :(
                </div>
            }
        </div>
    );


};
export default NextAppts;