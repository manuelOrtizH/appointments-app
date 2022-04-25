import React from "react";
import ListAppt from "./cardAppointments/ListAppt";

export const createApptFragments = (appointments, pymes, professionals, isHistorial) => {
    const dayFormatter = new Intl.DateTimeFormat('es', {day: '2-digit'});
    const monthFormatter = new Intl.DateTimeFormat('es', {month: 'long'});
    const hourFormatter = new Intl.DateTimeFormat('es', {hour: '2-digit', minute: '2-digit'})
    const listAppointmentsItems = [];
    let eventKey = 0;
    for (const [key, appt] of Object.entries(appointments)) {
        const apptDate = new Date(appt.date);
        const pyme = pymes.filter(el=> el.id === appt.pyme)[0]
        const responsable = professionals.filter(el=>el.id === appt.responsable)[0]

        listAppointmentsItems.push( 
            <div key={key}>
                <ListAppt
                    appointment={appt}
                    id={appt.id}
                    pyme={pyme.name}
                    reason={appt.reason}
                    responsable={`${responsable.name} ${responsable.last_name}`}
                    day={dayFormatter.format(apptDate)}
                    month={monthFormatter.format(apptDate)}
                    hour={hourFormatter.format(apptDate)}
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