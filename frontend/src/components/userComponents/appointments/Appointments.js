import React, { useState, useEffect } from 'react';
import { getAllProfessionals, getUser, getUserAppointments, getAllPymes } from '../../../actions/api';
import CardHistoryAppts from './cardHistoryAppointments/CardHistoryAppts';
import CardNextAppts from './cardNextAppointments/CardNextAppts';
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
    
    const [pymes, setPymes] = useState([])
    const listPymes = []



    useEffect(async() => {
        setIsLoading(true);
        await getAllProfessionals(setProfessionals);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments); 
        await getUserAppointments(setUserAppts);
        await getAllPymes(setPymes)
        setIsLoading(false);
    }, []);

    
    const filteredAppts = userAppts ? userAppts.filter(el=>appointments.includes(el.id)) : [];
    
    const notCompletedAppts = userAppts.filter(el=>!el.completed);

    return(
        <div className='centered '>
            {!isLoading &&
                <div>
                    <section className='cards ' style={{display:'flex', border: 'transparent'}}>
                        <CardHistoryAppts
                            appointments={filteredAppts}
                            professionals={professionals}
                            pymes={pymes}
                            user={user}
                        />
                        <CardNextAppts 
                            date={date}
                            month={month}
                            appointments={filteredAppts}
                            professionals={professionals}
                            pymes={pymes}
                            user={user}
                            allAppointments={appointments}
                        />

                    </section>

                </div>
            }
            {isLoading && <div className='mt-5'><Loading/></div>}
            {/* {isLoading && <CarouselPymes pymes={pymes} professionals={professionals} appointments={filteredAppts} user={user}/>} */}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Appointment);
