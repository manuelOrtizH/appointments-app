import React, {useState} from 'react';
import '../../../components/businessLine/Postcard.css';
import _Modal from '../../common/_Modal';

const Postcard = ({id,name,imageUrl, address, customForm}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);    
    
    return(
        <section className='dark '>
            <div className='container py-4'>
                <article className='postcard dark blue shadow-lg'>
                    <a className='postcard__img_link' href='#'>
                        <img className='postcard__img' src={imageUrl} alt='Image Title' />
                    </a>
                    <div className='postcard__text'>
                        <h1 className='postcard__title blue'><a href='#'>{name}</a></h1>
                        <div className='postcard__bar'></div>
  
                        <div className='postcard__preview-txt'>{address}</div>
                            <button className='btn btn-warning btn-sm' onClick={() => setIsModalOpen(true)}>Agendar Cita</button>
                            <button className='btn btn-success btn-sm mt-4' href='#'>Ver Disponibilidad</button>
                    </div>
                </article>
            </div>
            {/* <_Modal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            /> */}
        </section>
    );
};

export default Postcard;