import React, { useState, useEffect } from 'react';
import './Appointments.css';
import './CardAppt.css';
import axios from 'axios';
import { FaCalendarCheck } from "react-icons/fa";

const ListAppts = ({date,month}) => {

    return (
        <article className='appt-list mr-5 card card-appt mt-5 '>
            <div className='card-header-appt no-border'>
                <div class="calendar-badge">
                        <span class="badge-day">{date}</span>
                        <span class="badge-month">{month}</span>
                </div>
                <h3 className='card-title-appt text-center'>Mis citas</h3>
            </div>


            
            <hr ></hr>
         
        </article>

        // <article className='appt-data ml-5 card mr-5 mt-5' >
    //          <p className='text-center'>Reciente</p>
        // </article>

    );

};

export default ListAppts;