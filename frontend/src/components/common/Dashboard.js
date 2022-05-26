import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import '../../containers/Home';
import HomeUser from '../userComponents/home/Home';
import HomeAdmin from '../adminComponents/home/Home'
import { 
    getUser, 
    getUserAppointments, 
    getAllProfessionals, 
    getAllPymes, 
    getAllBusinessLines, 
    getAllAdmins } from '../../actions/api';
import Loading from './Loading';

const Dashboard = ({isAuthenticated}) => {
    let userName = '';
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [businessLines, setBusinessLines] = useState([]);
    const [pymes, setPymes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);
    const [admins, setAdmins] = useState([]);
    
    useEffect(async () => {
        setIsLoading(true);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments);
        await getUserAppointments(setUserAppts);
        await getAllProfessionals(setProfessionals);
        await getAllPymes(setPymes);
        await getAllBusinessLines(setBusinessLines);
        await getAllAdmins(setAdmins);
        setIsLoading(false);
    }, []);
    
    
    const isAdmin = user.length > 0 ? user[0].is_admin : false;

    let username = localStorage.getItem('userName');

    const adminFiltered = admins.length > 0 ? admins.filter(el=> el.uid === 39) : [];

    if(!isAuthenticated) return (<Navigate to='/' replace={true} />);

    return(
        <div>
            <div className = 'jumbotron jumbotron-fluid text-white' >
                <div className='container'>
                    <h1 className='display-4 text-white'>Hola, {username} !</h1>                
                </div>
            </div>
            {!isLoading && user.length > 0 && 
                <div>
                {!isAdmin && 
                    <HomeUser 
                        username={username}
                        pymes={pymes}
                        userAppts={userAppts}
                        professionals={professionals}
                        appointments={appointments}
                        businessLines={businessLines}
                    />
                }
                {isAdmin && 
                    <HomeAdmin
                        admin={adminFiltered[0]}
                        user={user}
                        pymes={pymes}
                        userAppts={userAppts}
                        professionals={professionals}
                        appointments={appointments}
                        businessLines={businessLines}
                    />
                }
                </div>
            }
            {isLoading && <div className='mt-5'><Loading></Loading></div>}

        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Dashboard);