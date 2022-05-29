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

export const getUserClient = async (id, setUser) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    await axios.get(`${process.env.REACT_APP_API_URL}/api/users_clients/${id}/`, config)
    .then((res)=>{
        setUser(res.data);
    })
};

export const editUser = async (body) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    await axios.put(`${process.env.REACT_APP_API_URL}/api/user_clients/${body.id}/`, body,config);
};

export const getAllUserClients = async (setUserClients) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    await axios.get(`${process.env.REACT_APP_API_URL}/api/users_clients/`, config)
    .then((res)=>{
        setUserClients(res.data);
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

export const getPyme = async(id, setPyme)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    await axios.get(`${process.env.REACT_APP_API_URL}/api/pymes/${id}/`, config)
    .then((res)=>{
        setPyme(res.data);
    })


};

export const handleAppointment = async (user, body) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (body.id){
        await axios.put(`${process.env.REACT_APP_API_URL}/api/appointments/${body.id}/`, body,config);
    } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/appointments/`, body,config)
        .then(async(res)=>{
            console.log(user);            
            user.appointments.push(res.data.id); 
            await axios.put(`${process.env.REACT_APP_API_URL}/api/users_clients/${user.id}/`, user, config);
        });
    };

    return (<Navigate to='/appointment' replace={true} />);
};

export const handleUser = async (body, toast) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (body.id){
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users_clients/${body.id}/`, body,config);
        
    } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users_clients/`, body,config);
    };

};

export const deleteAppointment = async (id, user) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/appointments/${id}/`)
    .then(async (res) => {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users_clients/${user.id}/`, user);
    });
}

export const handlePyme = async(body, setPyme) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (body.id){
        await axios.put(`${process.env.REACT_APP_API_URL}/api/pymes/${body.id}/`, body,config)
        .then((res)=> setPyme(res.data));
    } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/pymes/`, body,config);
    };
};

export const registerPyme = async(body,user) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    await axios.post(`${process.env.REACT_APP_API_URL}/api/pymes/`, body,config);

};

export const getAllAdmins = async(setAdmins) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    await axios.get(`${process.env.REACT_APP_API_URL}/api/admins/`,config)
    .then(res => setAdmins(res.data));

};

export const handleProfessional = async(body, pyme) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (body.id){
        await axios.put(`${process.env.REACT_APP_API_URL}/api/professionists/${body.id}/`, body,config);
    } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/professionists/`, body,config)
        .then(async(res) => {
            pyme.employees.push(res.data.id);
            console.log(pyme);
            await axios.put(`${process.env.REACT_APP_API_URL}/api/pymes/${pyme.id}/`, pyme, config);
        });
    };
};