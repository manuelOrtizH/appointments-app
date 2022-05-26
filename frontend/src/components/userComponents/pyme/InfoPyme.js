import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarCheck } from 'react-icons/fa'
import InfoApptModal from '../../common/ModalAppt';
import { getAllProfessionals, getPyme, getUser, handleAppointment, getUserAppointments } from '../../../actions/api';
import CalendarPyme from './CalendarPyme';
import Alert from "sweetalert2";

const InfoPyme = () => {
    const { id } = useParams();
    const [professionals, setProfessionals] = useState([]);
    const [user, setUser] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userAppts, setUserAppts] = useState([]);
    //
    const [pyme, setPyme] = useState([]);
    const [modalState, setModalState] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const apptForm = {date: '', reason: '', pyme: id, completed: false, data: pyme.custom_data_form, responsable: ''}
    
    
    const toggle = () => {
        setModalState({ modal: !modalState.modal })
    }

    useEffect(async() => {
        setIsLoading(true);
        await getAllProfessionals(setProfessionals);
        await getPyme(id, setPyme);
        await getUser(localStorage.getItem('userId'),setUser, setAppointments); 
        await getUserAppointments(setUserAppts);
        setIsLoading(false);
    }, []);

    
    const filteredAppts = userAppts.length > 0 ? userAppts.filter(el=>appointments.includes(el.id)) : [];
    const appointmentsId = filteredAppts.length > 0 ? filteredAppts.map(el=>el.id) : [];
    const pymeAppts = userAppts.length > 0 ? userAppts.filter(el=>el.pyme === id): [];

    const handleSubmit = async(formData, apptData, toast) => {
        
        apptData.data = formData;
            
        var dateCollision = false;
        

        const aD = new Date(apptData.date);

        for (let i = 0; i < filteredAppts.length; i++) {
            
            const date = new Date(filteredAppts[i].date);
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
            await Alert.fire("Cita creada!", `Tu cita con ${pyme.name} ha sido registrada con éxito`, "success");
            window.location.reload();
            // return (<Navigate to='/appointment' replace={true} />);
        }
        
    };

    const scheduleAppointment = item => setModalState({ apptForm: apptForm, modal: !modalState.modal});
    

    return(
        <div>
            {!isLoading && 
                <div>
                    <div className = 'jumbotron-fluid text-white' 
                    style={{height: '250px', 
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.6) 100%), url(${pyme.image_url})`, 
                            backgroundSize: 'contain'}} >
                    </div>
                    <div className='container mt-4'>
                        <div className='row'>
                            <div className='col'>
                                <h1 style={{ color: '#880808'}} className='text-center mr-5'>{pyme.name} <button onClick={scheduleAppointment} className='btn btn-warning'><FaCalendarCheck className='mr-2'/>Agendar Cita</button></h1>
                            </div>

                        </div>
                        
                        <h6 className='text-center'><i>"{pyme.slogan}"</i></h6>
                        <h6 className='text-center'>Giro: <b>{pyme.business_line}</b></h6>
                        <hr></hr>

                        <h4 className='text-center mt-5'>{pyme.description}</h4>
                        <h5 className='text-center mt-5'><b>¿Dónde?</b></h5>
                        <h4 className='text-center mt-3'>{pyme.address}</h4>
                        <h3 className='text-center mt-5'><b>Disponibilidad</b></h3>
                        <CalendarPyme
                            filteredAppts={pymeAppts}
                            professionals={professionals}
                            pyme={pyme}
                        />
                    </div>
                
            
                {modalState.modal ? (
                    <InfoApptModal
                        activeItem={modalState.activeItem}
                        toggle={toggle}
                        onSave={handleSubmit}
                        pymeName={pyme.name}
                        pymeAddress={pyme.address}
                        pymeImage={pyme.image_url}
                        customForm={{...pyme.custom_data_from}}
                        professionals={professionals}
                        pymeEmployees={pyme.employees}
                        apptForm={apptForm}
                        isEdit={false}
                    />
                ) : null}
                </div>
            }
        </div>
    );
};
export default InfoPyme;