import React, {useState} from 'react';
import './styles/Postcard.css'
import ModalBusinessLine from './ModalBusinessLine';
import { useNavigate } from 'react-router-dom';

const Postcard = ({name, description, pymes, imageUrl}) => {
    const [modal, setModal] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const toggle = () => setModal({ modal: !modal.modal });
    let navigate = useNavigate();
    const handleModal = (item) => setModal({ apptForm: '', modal: !modal.modal });
    
    const filteredPymes = pymes.filter(el=> el.business_line === name);
    

    const handleSubmit = (id) =>{
        console.log(id);
        navigate(`/pyme/${id}`, { replace: true });

    };

    return(
        <section className='dark '>
            <div className='container py-4'>
                <article className='postcard dark blue shadow-lg'>
                    <a className='postcard__img_link' href='#'>
                        <img className='postcard__img' src={imageUrl} alt='Image Title' />
                    </a>
                    <div className='postcard__text'>
                        <h1 className='postcard__title blue'><a href='#'>{name}</a></h1>
                        <div className='postcard__subtitle small'>
                            
                            <i className='fas fa-calendar-alt mr-2'></i>
                            Disponibilidad de PyMES:  <b>{filteredPymes.length}</b>
                            
                        </div>
                        <div className='postcard__bar'></div>
                        <div className='postcard__preview-txt'>{description}</div>
                        <ul className='postcard__tagbox'>
                            <li className='tag__item play blue'>
                                <a onClick={handleModal}><i className='fas fa-play mr-2'></i>PyMEs en este sector</a>
                            </li>
                        </ul>
                    </div>
                </article>
                {modal.modal ? (
                <ModalBusinessLine
                    activeItem={modal.activeItem}
                    toggle={toggle}
                    onSave={handleSubmit}
                    pymes={filteredPymes}
                />
                ) : null}
            </div>
        </section>
    );
};

export default Postcard;