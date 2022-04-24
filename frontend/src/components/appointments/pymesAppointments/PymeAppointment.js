import React, {useState} from 'react';
import '../../../components/businessLine/Postcard.css';
import CustomModal from '../CustomModal';
import { createAppointment, getUser } from '../../../actions/api';

const PymeAppointment = ({id,name,imageUrl, address, customForm, professionals, employees}) => {
    
    const apptForm = {date: '', reason: '', pyme: id, completed: false, data: customForm, responsable: ''}

    const [modalState, setModalState] = useState({viewCompleted: false, 
                                                  modal: false, apptForm: '' });

    const [appointments, setAppointments] = useState([]);
    const [user, setUser] = useState([]);
                                                
    const toggle = () => {
        setModalState({ modal: !modalState.modal })
    }

    const handleSubmit = async(formData, apptData) => {
        toggle();
        apptData.data = formData;
        console.log(apptData);
        // await getUser(localStorage.getItem('userId'), setUser ,setAppointments)
        // setAppointments([...localStorage.getItem('userAppts')])
        console.log(appointments)
        // await createAppointment(localStorage.getItem('userClientId'), apptData, localStorage.getItem('userAppts'));
        
    };

    
    const scheduleAppointment = (item) => {
        setModalState({ apptForm: apptForm, modal: !modalState.modal });
    };


    
    return(
        <div>
            <section className='dark '>
                <div className='container py-4'>
                    <article className='postcard dark blue shadow-lg'>
                        <a className='postcard__img_link' href='#'>
                            <img className='postcard__img' src={imageUrl} alt='Image Title' />
                        </a>
                        <div className='postcard__text'>
                            <h1 className='postcard__title blue'><a href='#'>{name}</a></h1>
                            <div className='postcard__bar'></div>
    
                            <div className='postcard__preview-txt '>{address}</div>
                                <button className='btn btn-warning btn-sm' onClick={scheduleAppointment} style={{display: 'flow-root'}}>Agendar Cita</button>
                                <button className='btn btn-success btn-sm mt-4' href='#'>Ver Disponibilidad</button>
                        </div>
                    </article>
                </div>
            </section>

            {modalState.modal ? (
                <CustomModal
                    activeItem={modalState.activeItem}
                    toggle={toggle}
                    onSave={handleSubmit}
                    pymeName={name}
                    pymeAddress={address}
                    pymeImage={imageUrl}
                    customForm={customForm}
                    professionals={professionals}
                    pymeEmployees={employees}
                    apptForm={apptForm}
                />
            ) : null}
        </div>
    );
};

export default PymeAppointment;