import axios from 'axios';


export const getUser = async (uid, setUser, setAppointments) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    await axios.get(`${process.env.REACT_APP_API_URL}/api/users_clients/`, {params: uid}, config)
    .then((res) => {
        const actualUser = res.data.filter(el=>el.uid == uid)
        setUser(actualUser);
        setAppointments(actualUser[0].appointments);
        localStorage.setItem('userClientId', actualUser[0].id);
        localStorage.setItem('userAppts', actualUser[0].appointments);
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

export const createAppointment = async (userId,body, appointments) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };



    await
    axios.post(`${process.env.REACT_APP_API_URL}/api/appointments/`, body,config)
    .then((res)=>{
        appointments.push(res.data.id);
        console.log(appointments)
        axios.put(`${process.env.REACT_APP_API_URL}/api/users_clients/${userId}/`, {appointments: appointments});
    })
};