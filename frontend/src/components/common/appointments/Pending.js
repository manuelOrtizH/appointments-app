import React, { useState, useEffect } from 'react';
import '../styles/Appointments.css';
import '../styles/Card.css';
import { createApptFragments } from '../../../actions/createApptsCard';
import ModalAppt from '../ModalAppt';
import { handleAppointment } from '../../../actions/api';
import Alert from 'sweetalert2';
import { isDateOccupied } from '../../../actions/date';


const Pending = ({date,month, appointments, professionals, pymes, user, allAppointments, isAdmin, clients, pymeAdmin}) => {
    const notCompletedAppts = appointments.filter(el=> !el.completed);
    
    const listAppointmentsItems = createApptFragments(notCompletedAppts, pymes, professionals, false, user, isAdmin, clients);
    const [modalState, setModalState] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const apptForm = {date: '', reason: '', pyme: pymeAdmin.id, completed: false, data: pymeAdmin.custom_data_form, responsable: '', client: ''}
    const toggle = () => setModalState({ modal: !modalState.modal });

    const handleSubmit = async(formData, apptData, toast) => {
        apptData.data = formData;
        const userClient = clients.filter(el=> el.id === apptData.client);
        
        if (isDateOccupied(new Date(apptData.date), notCompletedAppts)){
            toast.error('Horario no disponible, selecciona otro porfavor.');
        }else{
            delete apptData.client;
            await handleAppointment(userClient[0], apptData);
            toggle();
            await Alert.fire("Cita creada!", `Tu cita ha sido registrada con éxito`, "success");
            window.location.reload();
        }

     
    };

    const scheduleAppointment = item => setModalState({ apptForm: {}, modal: !modalState.modal });

    return (
        <article className='appt-list card  mt-5 mb-5'>
            <div>

                <div className='card-body'>
                    <div className='no-border text-center'>
                        <div className='calendar-badge'>
                                <span className='badge-day'>{date}</span>
                                <span className='badge-month'>{month}</span>
                        </div>
                        <div className='row'>
                            <div className='col text-left mt-5 mr-5'>
                                <h1 className='card-title text-center'>Mis Próximas Citas</h1>
                            </div>
                            <div className='col text-right mt-5 mr-3'>
                                {isAdmin && 
                                <button className='btn btn-warning btn-lg ' onClick={scheduleAppointment} type='button' > Agendar Cita</button>
                                }
                            </div>
                        </div>
                        
                        <hr></hr>
                    </div>
                    <div>
                        {listAppointmentsItems.length > 0 && listAppointmentsItems }
                        {listAppointmentsItems.length === 0 && <p className='text-center'>No se encontraron citas...</p> }
                    </div>
                </div>
                <div className='card-header no-border'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col text-center mt-2 mb-2'>
                                <button className='btn btn-warning btn-lg d-none' type='button' > Agendar Más Citas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalState.modal ? (
                <ModalAppt
                    activeItem={modalState.activeItem}
                    toggle={toggle}
                    onSave={handleSubmit}
                    pymeName={pymeAdmin.name}
                    pymeAddress={pymeAdmin.address}
                    pymeImage={pymeAdmin.img_url}
                    customForm={pymeAdmin.custom_data_form}
                    professionals={professionals}
                    pymeEmployees={pymeAdmin.employees}
                    apptForm={apptForm}
                    isEdit={false}
                    clients={clients}
                    isAdmin={isAdmin}
                    user={user}
                />
            ) : null}
            
        </article>
    );
};

export default Pending;