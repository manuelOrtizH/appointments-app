import React, {useState} from 'react';
import '../../../components/businessLine/Postcard.css';
import CustomModal from '../CustomModal';

const Postcard = ({id,name,imageUrl, address, customForm}) => {
    
    const [modalState, setModalState] = useState({viewCompleted: false, 
                                                  modal: false, 
                                                  activeItem:{
                                                      title: '',
                                                      description: '',
                                                      completed: false,
                                                  },
                                                });
                                                
    const toggle = () => {
        setModalState({ modal: !modalState.modal })
    }

    const handleSubmit = (item) => {
        toggle();
    
        console.log('saved');
    };

    const handleDelete = (item) => {
        console.log('delete');
    };

    
    const scheduleAppointment = (item) => {
        setModalState({ activeItem: item, modal: !modalState.modal });
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
                />
            ) : null}
        </div>
    );
};

export default Postcard;