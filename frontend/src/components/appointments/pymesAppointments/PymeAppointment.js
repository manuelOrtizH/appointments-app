import React, {useState} from 'react';
import '../../../components/businessLine/Postcard.css';
import CustomModal from '../CustomModal';
import { handleAppointment } from '../../../actions/api';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const PymeAppointment = ({id,name,imageUrl, address, customForm, professionals, employees, appointments, user}) => {
    
    const apptForm = {date: '', reason: '', pyme: id, completed: false, data: customForm, responsable: ''}
    const [modalState, setModalState] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const [appointmentsId, setAppointmentsId] = useState(appointments.map(el=>el.id))
    const userAppts = user[0].appointments;
    
    const toggle = () => {
        setModalState({ modal: !modalState.modal })
    }

    const handleSubmit = (formData, apptData) => {
        toggle();
        apptData.data = formData;
        console.log(apptData);       
        var dateCollision = 0;
        handleAppointment(user[0], apptData, appointmentsId);

        console.log(apptData.date);
        console.log("--v--")

        for (let i = 0; i < appointments.length; i++) {
            console.log("----")
            console.log(appointments[i].date);
            
            if (apptData.date===appointments[i].date && apptData.id!==appointments[i].id){
                dateCollision=1;
                //break;
            };
        };
        console.log(dateCollision);
        return (<Navigate to='/appointment' replace={true} />);
    };

    
    const scheduleAppointment = (item) => {
        setModalState({ apptForm: apptForm, modal: !modalState.modal});
    };


    
    return(
        <div>
            
            <section className='dark '>
                <div className='container py-4'>
                    <article className='postcard dark blue shadow-lg'>
                        <Link className='postcard__img_link' to={{ pathname: `/pyme/edit-pyme/${id}`}}>
                            <img className='postcard__img' src={imageUrl} alt='Image Title' />
                        </Link>
                        <div className='postcard__text'>
                            <h1 className='postcard__title blue'><Link to={{ pathname: `/pyme/edit-pyme/${id}`}}>{name}</Link></h1>
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
                    isEdit={false}
                />
                
            ) : null}
            
        </div>
    );
};

export default PymeAppointment;