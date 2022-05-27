import React, { useState, useEffect } from 'react';
import { getAllProfessionals, getUser, getUserAppointments, getAllPymes, getAllAdmins, getAllUserClients } from '../../../actions/api';
import History from './History'
import Pending from './Pending'
import { connect } from 'react-redux';
import Loading from '../../common/Loading';

const Appointment = ({isAuthenticated}) => {
    const [professionals, setProfessionals] = useState([]);
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);
    const newDate = new Date();
    const date = newDate.getDate();
    const formatter = new Intl.DateTimeFormat('es', { month: 'short' });
    const month = formatter.format(new Date());
    const year = newDate.getFullYear();
    const today = `${date} / ${month<10?`0${month}`:`${month}`} / ${year}`
    const [admins, setAdmins] = useState([]);
    const [userClients, setUserClients] = useState([]);
    const [pymes, setPymes] = useState([]);
    const listPymes = [];

    useEffect(async() => {
        setIsLoading(true);
        await getAllProfessionals(setProfessionals);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments); 
        await getUserAppointments(setUserAppts);
        await getAllPymes(setPymes);
        await getAllAdmins(setAdmins);
        await getAllUserClients(setUserClients);
        setIsLoading(false);
    }, []);

    const isAdmin = user.length > 0 ? user[0].is_admin : false;
    const adminFiltered = admins.length > 0 ? admins.filter(el=> el.uid == localStorage.getItem('userId')) : [];
    const filteredAppts = userAppts ? userAppts.filter(el=>appointments.includes(el.id)) : [];    
    const notCompletedAppts = userAppts.filter(el=>!el.completed);

    return(
        <div className='centered '>
            {!isLoading &&
                
                <div>
                    {!isAdmin && 
                    <section className='cards ' style={{display:'flex', border: 'transparent'}}>
                        <History
                            appointments={filteredAppts}
                            professionals={professionals}
                            pymes={pymes}
                            user={user}
                            isAdmin={isAdmin}
                        />
                        <Pending 
                            date={date}
                            month={month}
                            appointments={filteredAppts}
                            professionals={professionals}
                            pymes={pymes}
                            user={user}
                            allAppointments={appointments}
                            isAdmin={isAdmin}
                        />
                    </section>
                    }
                    {isAdmin && 
                        <section className='cards ' style={{display:'flex', border: 'transparent'}}>
                            <History
                                appointments={filteredAppts}
                                professionals={professionals}
                                pymes={pymes}
                                user={user}
                                isAdmin={isAdmin}
                            />
                            <Pending 
                                date={date}
                                month={month}
                                appointments={filteredAppts}
                                professionals={professionals}
                                pymes={pymes}
                                user={user}
                                allAppointments={appointments}
                                isAdmin={isAdmin}
                            />
                        </section>
                    }
                </div>
            }
            {isLoading && <div className='mt-5'><Loading/></div>}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Appointment);
