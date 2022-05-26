import React from "react";
import NextApptsInfo from '../components/userComponents/appointments/cardNextAppointments/NextApptsInfo';
import { getDate } from "./getDate";

export const createApptFragments = (appointments, pymes, professionals, isHistorial, user) => {
    const dayFormatter = new Intl.DateTimeFormat('es', {day: '2-digit'});
    const monthFormatter = new Intl.DateTimeFormat('es', {month: 'long'});
    const hourFormatter = new Intl.DateTimeFormat('es', {hour: '2-digit', minute: '2-digit'})


    const listAppointmentsItems = [];
    let eventKey = 0;
    for (const [key, appt] of Object.entries(appointments)) {
        const pyme = pymes.filter(el=> el.id === appt.pyme)[0]
        const responsable = professionals.filter(el=>el.id === appt.responsable)[0]
        const [day,month,hour] = [...getDate(new Date(appt.date))]
        listAppointmentsItems.push( 
            <div key={key}>
                <NextApptsInfo
                    user={user}
                    professionals={professionals}
                    employees={pyme.employees}
                    appointment={appt}
                    id={appt.id}
                    pymeId={pyme.id}
                    pyme={pyme.name}
                    address={pyme.address}
                    reason={appt.reason}
                    responsable={`${responsable.name} ${responsable.last_name}`}
                    day={day}
                    month={month}
                    hour={hour}
                    imageUrl={pyme.image_url}
                    customForm={appt.data}
                    isHistorial={isHistorial}
                />
            </div>
        );
        eventKey+=1;
    };

    return listAppointmentsItems;
};