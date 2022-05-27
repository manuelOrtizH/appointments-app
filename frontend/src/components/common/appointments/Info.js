import React, {useState} from 'react';
import '../styles/Appointments.css';
import '../styles/Card.css';
import '../styles/ListAppts.css';
import useCollapse from 'react-collapsed';
import { deleteAppointment, handleAppointment, getUserAppointments } from '../../../actions/api';
import InfoApptModal from '../ModalAppt';
import Alert from "sweetalert2";


const Info = ({user, professionals, employees, appointment, id, pymeId,pyme, address,reason,responsable,day,month,hour, imageUrl, customForm, isHistorial, isAdmin, client}) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const listInfoAppt = [];
    const apptForm = {date: '', reason: '', pyme: id, completed: false, data: customForm, responsable: ''}
    const [modalState, setModalState] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const toggle = () => setModalState({ modal: !modalState.modal });
    
    const handleSubmit = async(formData, apptData) => {
        apptData.data = formData;
        handleAppointment(user[0], apptData, []);
        await Alert.fire("Cita editada!", `Tu cita ha sido editada`, "success");
        window.location.reload();
        toggle();        
    };

    
    const handleEdit = item => setModalState({ apptForm: apptForm, modal: !modalState.modal });
    
    let key = 0
    for (const [field,value] of Object.entries(customForm)){
        listInfoAppt.push(
            <div key={key}>
                <span className='main-info text-left' style={{fontSize: '100%', color: 'green'}}>
                    <i>{field}: </i> <span className='main-info'>{value}</span>
                </span> <hr></hr>
            </div>
        );
        key+=1;
    };    

    const handleDelete = async() => {
        deleteAppointment(id);
        await Alert.fire("Cita eliminada!", `Tu cita ha sido eliminada`, "success");
        window.location.reload();
    };
    
    const handleCompleted = async() => {
        appointment.completed = true;
        const crsf_token = `${document.cookie}`
        handleAppointment(crsf_token,appointment,[]);
        await Alert.fire("Cita completada!", `Tu cita ha sido completada`, "success");
        window.location.reload();
    };
    

    return (
        <div>
            <section className='collapsible'>
                <article className='appt header' {...getToggleProps()} >
                    <img className='appt-icon' src={imageUrl} alt='img-pyme'/> 
                    
                    <span className='main-info'>{pyme} <br></br>
                        <span style={{fontSize: '70%', color: 'black'}}>
                            <i style={{ color: 'green'}}>Dirección: </i> {address}
                        </span>
                         <br></br> 
                        <span style={{fontSize: '80%', color: 'green'}}>
                            <i>Razón:</i>
                        </span> {reason}
                        <span> <br></br> 
                            <i> 
                                <span style={{fontSize: '80%', color: 'green'}}>Responsable:</span> {responsable}
                            </i>
                        </span> <br></br> 
                        {isAdmin && 
                        <div>
                            
                            <span>
                                <i> 
                                    <span style={{fontSize: '80%', color: 'green'}}>Cliente:</span> {client}
                                </i>
                            </span>
                        </div>
                        }
                    </span>
                    <span className='date-info'>{day} <span>de</span> {month}<span> <br></br> Hora: {hour}</span></span>


                </article>
                <article className='appt-info' {...getCollapseProps()} >
                    <div className='content text-center'  style={{margintTop: '10px'}} >
                    <p className='text-center'>Más información con respecto a la cita</p>
                        {listInfoAppt }
                        {listInfoAppt.length === 0 && <p>No se encontraron más datos</p>}
                        {!isHistorial && 
                            <div className='row mt-3'>
                                <div className='col'>
                                    <button className='btn btn-success' onClick={handleEdit}> Editar Cita</button>
                                </div>
                                <div className='col'>
                                    <button className='btn btn-info btn-sm mt-1' onClick={handleCompleted}> Marcar como Completada</button>
                                </div>
                                <div className='col'>
                                    <button className='btn btn-danger' onClick={handleDelete}> Eliminar Cita</button>
                                </div>
                            </div>
                        }

                    </div>
                </article>

                <hr></hr>

            </section>
            {modalState.modal ? (
                <InfoApptModal
                    activeItem={modalState.activeItem}
                    toggle={toggle}
                    onSave={handleSubmit}
                    pymeName={pyme}
                    pymeAddress={address}
                    pymeImage={imageUrl}
                    customForm={customForm}
                    professionals={professionals}
                    pymeEmployees={employees}
                    apptForm={appointment}
                    isEdit={true}
                />
            ) : null}
        </div>

    );

};

export default Info;