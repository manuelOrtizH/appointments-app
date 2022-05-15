import React, {useState} from 'react';
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

  import StepWizard from "react-step-wizard";

import { FaPenFancy } from 'react-icons/fa';

const Wizard = (props) => {
    const [formData, setFormData] = useState({});
    const onCustomFormChange = (e) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };  

    const { toggle, onSave } = props;

    return(
        <div>
            <Modal isOpen={true} centered={true} toggle={toggle} fullscreen={'xl'}>
                <ModalHeader  toggle={toggle} style={{backgroundColor: 'white', 
                                                    color: 'black', textAlign: 'center'}}>
                Creación de campos nuevos
                </ModalHeader>
                <ModalBody>
                    <p className='text-center'>Agregar campo</p>

                </ModalBody>
                <ModalFooter style={{background: '#880808'}}>
                    <Button
                        color="warning"
                        onClick={() => onSave(formData)}
                    >
                        Guardar Cambios
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default Wizard;