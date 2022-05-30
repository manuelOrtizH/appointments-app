import React, {useEffect, useState} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

import { FaPlus, FaTrash } from "react-icons/fa";

import { FaPenFancy } from 'react-icons/fa';

const AddFieldsModal = (props) => {
    const [formData, setFormData] = useState({});
    const [customFormData, setCustomFormData] = useState();
    const myForm = {'Salud': {'Tipo Sangre': ' ', 'Medicamentos': ' ', 'Historial Medico': ' ', 'Tratamiento': ' '},
                    'Comida': {'Acompañantes': ' ', 'Reservacion': ' ', 'Duracion': ' '},
                    'Educacion': {'Nivel Academico': ' ', 'Materia': ' ', 'Tema': ' ', },
                    'Musica': {'Instrumento': ' ', 'Nivel': ' ', 'Genero Musical': ' '},
                    'Derecho' : {'Asesoria Legal': ' ', 'Demanda': ' ', 'Tipo de Asesoria': ' ', 'Antecedentes Penales': ' ', 'Acompañantes': ' '},
                    'Entretenimiento': {'Acompañantes': ' ', 'Duracion': ' ', 'Actividad': ' '},
                    'Belleza': {'Tratamiento': ' ', 'Productos': ' ', 'Reservacion': ''},
                    'Otro': {},
                    };
    
    const listPymes = [];

    if(props.pymes){
        props.pymes.map(el=> {
            listPymes.push(
                <div key={el.id}>
                    <article className='appt ' onClick={()=> onSave(el.id)}>
                        <img className='appt-icon' src={el.image_url} alt='img-pyme'/> 
                        <span className='main-info'> 
                            <span style={{fontSize: '70%', color: 'black'}}>
                                {el.name}
                            </span>
                             <br></br> 
                            <span style={{fontSize: '80%', color: 'green'}}>
                            <i>{el.slogan}</i>
                            </span> 
                        </span>
                    </article>
                    <hr></hr>
                </div>
                
            );
        });
    }
   
 



    const { toggle, onSave } = props;

    return(
        <div>
            <Modal isOpen={true} size='lg' centered={true} toggle={toggle} fullscreen={'xl'}>
                <ModalHeader  toggle={toggle} style={{backgroundColor: 'white', 
                                                    color: 'black', textAlign: 'left'}}>
                Las PyMEs en el sector : 

                </ModalHeader>
                <ModalBody>
                    {listPymes}
                </ModalBody>
                <ModalFooter style={{background: '#880808'}}>
                    <div className='row'>

                        <div className='col-lg text-right'>
                            <Button
                                color="danger"
                                onClick={() => toggle()}
                            > 
                                Cerrar
                            </Button>
                        </div>
                    </div>

                </ModalFooter>
            </Modal>
        </div>
    );
};
export default AddFieldsModal;