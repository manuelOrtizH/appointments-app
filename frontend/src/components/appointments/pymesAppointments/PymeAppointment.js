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

    const handleSubmit = (formData, apptData, toast) => {
        
        apptData.data = formData;
        console.log(apptData);       
        var dateCollision = false;
        

        const aD = new Date(apptData.date);

        for (let i = 0; i < appointments.length; i++) {
            console.log("----")
            
            const date = new Date(appointments[i].date);
            const correctedDate = new Date(date.toISOString().slice(0, -1));
            
            if (aD.getTime()===correctedDate.getTime()){
                dateCollision=true;
                break;
            };
        };

        if (dateCollision===true){
            toast.error('Horario no disponible, selecciona otro porfavor.');
        }else{
            handleAppointment(user[0], apptData, appointmentsId);
            toggle();
            return (<Navigate to='/appointment' replace={true} />);
        }
        
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