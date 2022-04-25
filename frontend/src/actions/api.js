import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';

export const getUser = async (uid, setUser, setAppointments) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    await axios.get(`${process.env.REACT_APP_API_URL}/api/users_clients/`, config)
    .then((res) => {
        const actualUser = res.data.filter(el=>el.uid == uid)
        setUser(actualUser);
        if (actualUser[0].appointments.length > 0){
            setAppointments(actualUser[0].appointments);
        }
        
        localStorage.setItem('userClientId', actualUser[0].id);
        
    });   
};

export const getAllBusinessLines = async (setBusinessLines) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    
    await axios.get(`${process.env.REACT_APP_API_URL}/api/business_lines/`, config)
    .then((res) => {
        setBusinessLines(res.data);
    });
};

export const getUserAppointments = async (setUserAppointments) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    
    await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments/`,config)
    .then((res) => {
        setUserAppointments(res.data);
    });
};

export const getAllProfessionals = async (setProfessionals) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    await
    axios.get(`${process.env.REACT_APP_API_URL}/api/professionists/`, config)
    .then((res) => {
        setProfessionals(res.data);
    });
};

export const getAppointmentsProfessionals = async (profIds, setProfessionals) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    await
    axios.get(`${process.env.REACT_APP_API_URL}/api/professionists/`, {params: {id: profIds}},config)
    .then((res) => {
        setProfessionals(res.data);
    });
};


export const getAllPymes = async (setPymes) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    await
    axios.get(`${process.env.REACT_APP_API_URL}/api/pymes/`, config)
    .then((res) => {
        setPymes(res.data);
    });
    
};

export const handleAppointment = async (user, body, appts) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (body.id){
        await axios.put(`${process.env.REACT_APP_API_URL}/api/appointments/${body.id}/`, body,config);
    } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/appointments/`, body,config)
        .then((res)=>{
            appts.push(res.data.id);
            console.log(appts)
            user.appointments = appts;
            axios.put(`${process.env.REACT_APP_API_URL}/api/users_clients/${user.id}/`, user, config);
        });
    };

    return (<Navigate to='/appointment' replace={true} />);
};

export const deleteAppointment = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/appointments/${id}/`)
    .then((res) => console.log('Succesfully deleted: ', res));
}