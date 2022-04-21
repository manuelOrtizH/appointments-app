import React, { useState, useEffect } from 'react';
import './Appointments.css';
import './CardAppt.css';
import axios from 'axios';
import { FaCalendarCheck } from "react-icons/fa";

const UserData = () => {

    return (
        <article className='appt-data ml-5 card mr-5 mt-5' >
            <p className='text-center'>Reciente</p>
        </article>


    );

};

export default UserData;