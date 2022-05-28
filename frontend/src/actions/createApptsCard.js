import React from "react";
import Info from '../components/common/appointments/Info';
import { getDate } from "./date";

export const createApptFragments = (appointments, pymes, professionals, isHistorial, user, isAdmin, clients) => {

    const listAppointmentsItems = [];
    let eventKey = 0;
    for (const [key, appt] of Object.entries(appointments)) {
        
        
        const client = clients ? clients.filter(el => el.appointments.includes(appt.id))[0] : false;
        
        const pyme = pymes.filter(el=> el.id === appt.pyme)[0]
        const responsable = professionals.filter(el=>el.id === appt.responsable)[0]
        const [day,month,hour] = [...getDate(new Date(appt.date))]
        listAppointmentsItems.push( 
            <div key={key}>
                <Info
                    user={user}
                    professionals={professionals}
                    employees={pyme.employees}
                    appointment={appt}
                    id={appt.id}
                    pymeId={pyme.id}
                    pyme={pyme.name}
                    address={pyme.address}
                    reason={appt.reason}
                    responsable={professionals ? `${responsable.name} ${responsable.last_name}` : ' '}
                    day={day}
                    month={month}
                    hour={hour}
                    imageUrl={pyme.image_url}
                    customForm={appt.data}
                    isHistorial={isHistorial}
                    isAdmin={isAdmin}
                    client={client ? `${client.name} ${client.last_name}` : ' '}
                />
            </div>
        );
        eventKey+=1;
    };

    return listAppointmentsItems;
};