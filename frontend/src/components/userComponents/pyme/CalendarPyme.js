import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from '@fullcalendar/core/locales/es'
import { deleteAppointment } from '../../../actions/api';
import Alert from "sweetalert2";
import { getDate } from '../../../actions/date';


const CalendarPyme = ({filteredAppts, professionals, pyme}) => {

    const userEvents = [];
    filteredAppts.map(el => {
        const responsable = professionals.filter(pro => pro.id === el.responsable)[0];
        const namePyme = pyme.name;
        const nameResponsable = `${responsable.name} ${responsable.last_name}`
        const eventColor = new Date(el.date).toISOString().slice(0,16) < new Date().toISOString().slice(0,16) ? 'red' : 'blue'
        userEvents.push({id: el.id, title: el.reason, date: new Date(el.date).toISOString().slice(0,16), color: eventColor});
    });

    const handleDateClick = eventClick => { // bind with an arrow function
        const eventAppointment = filteredAppts.filter(el => el.id === eventClick.event.id)[0];
        const responsable = professionals.filter(el => el.id === eventAppointment.responsable)[0]; 
        const [day, month, hour] = [...getDate(new Date(eventAppointment.date))];
        const isCancelable = /*new Date(eventAppointment.date) < new Date() ? false : true*/ false;
        console.log(pyme.name);
        Alert.fire({
            title: pyme.name,
            html:
              `<div class="table-responsive">
            <table class="table">
            <tbody>
            <tr >
            <td>Razón</td>
            <td><strong>` +
              eventClick.event.title +
              `</strong></td>
            </tr>
            <tr >
            <td>Responsable</td>
            <td><strong>` +
              responsable.name + ' ' + responsable.last_name +
              `</strong></td>
            </tr>
            <tr >
            <td>Hora de la cita</td>
            <td><strong>
            ` +
              day + ' de '+ month + ' a las ' + hour +
              `
            </strong></td>
            </tr>
            </tbody>
            </table>
            </div>`,
      
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Cancelar Cita",
            cancelButtonText: "Cerrar",
            showConfirmButton: isCancelable,

        }).then(async (result) => {
            if (result.value) {
                eventClick.event.remove(); // It will remove event from the calendar
                Alert.fire("Cita cancelada!", "Tu cita ha sido cancelada con éxito", "success");
                await deleteAppointment(eventClick.event.id);
            }
        });
        
    }
    

    return(
        <div className='text-center mt-5' style={{color: '#880808'}}>
            <div>
                <FullCalendar
                    plugins={[ dayGridPlugin, timeGridPlugin ]}
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                        locale: 'es'
                    }}
                    rerenderDelay={10}
                    locale={esLocale}   
                    events={[
                        ...userEvents
                    ]}
                />
            </div>
        </div>    
    );
};
export default CalendarPyme;