import axios from 'axios';


export const getUser = async (uid, setUser) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    await axios.get(`${process.env.REACT_APP_API_URL}/api/users_clients/`, {params: uid}, config)
    .then((res) => {
        console.log('USER: ', res.data)
        setUser(res.data);
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
        console.log('BL: ', res.data);
        setBusinessLines(res.data);
    });
};

export const getUserAppointments = async (apptIds, setUserAppointments) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments/`, {params: {id: apptIds}}, config)
    .then((res) => {
        console.log('APPTS: ', res.data);
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
        console.log('PROS: ', res.data);
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
        console.log('PROS: ', res.data);
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
        console.log('PYMES: ', res.data);
        setPymes(res.data);
    });
    
};