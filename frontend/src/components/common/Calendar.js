import React, {useState, useEffect} from 'react';
import { getUser, getUserAppointments, getAllProfessionals, getAllPymes, getAllAdmins, getAllUserClients } from '../../actions/api';
import Loading from './Loading';
import FullCalendar from './FullCalendar';


const Calendar = () => {
    let userName = '';
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [pymes, setPymes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [userClients, setUserClients] = useState([]);
    
    useEffect(async () => {
        setIsLoading(true);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments);
        await getUserAppointments(setUserAppts);
        await getAllProfessionals(setProfessionals);
        await getAllPymes(setPymes);
        await getAllAdmins(setAdmins);
        await getAllUserClients(setUserClients);
        setIsLoading(false);
    }, []);

    const isAdmin = user.length > 0 ? user[0].is_admin : false;
    let adminFiltered = [];
    let pyme = [];
    if(isAdmin){
        adminFiltered = admins.length > 0 ? admins.filter(el=> el.uid == localStorage.getItem('userId'))[0] : [];
        pyme = pymes.length > 0 ? pymes.filter(el=>el.admin === adminFiltered.id)[0] : [];
    };
    

    return (
        <div>
            {!isLoading && user.length > 0 && 
                <div>
                    {!isAdmin && 
                        <FullCalendar
                            filteredAppts={userAppts ? userAppts.filter(el=>appointments.includes(el.id)) : []}
                            professionals={professionals}
                            pymes={pymes}
                            isAdmin={false}
                        />
                    }
                    {isAdmin && adminFiltered && pyme &&
                        <FullCalendar
                            filteredAppts={userAppts ? userAppts.filter(el=> el.pyme === pyme.id): []}
                            professionals={professionals}
                            pymes={pymes.filter(el=>el.admin === adminFiltered.id)}
                            isAdmin={true}
                        />
                    }
                    
                </div>
            }
            {isLoading && <div className='mt-5'><Loading></Loading></div>}
        </div>
    );

}
export default Calendar;