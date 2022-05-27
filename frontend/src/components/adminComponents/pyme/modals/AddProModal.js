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

import { FaEnvelope, FaLock, FaUserAlt, FaUserTie, FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const AddProModal = (props) => {
    const [formData, setFormData] = useState(props.customForm);
  
    const onCustomFormChange = (e) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };  


    const { toggle, onSave } = props;

    return(
        <div>
            <Modal isOpen={true} size='lg' centered={true} show={true} toggle={toggle} fullscreen={'xl'} >
                <ModalHeader  toggle={toggle} style={{backgroundColor: 'white', 
                                                    color: 'black', textAlign: 'center'}}>
                Datos de colaborador
                </ModalHeader>
                <ModalBody>
                    <p className='text-center'>Completa los datos para agregar a un profesional</p>
                    <Form>
                        <FormGroup>
                            <span className="card-text text-white"><FaUserAlt/> Nombre(s)</span>
                            <Input
                                className='form-control form-field' 
                                type="text" 
                                placeholder='Nombre(s) del colaborador'
                                name="name" value={formData.name}
                                onChange={e=>onCustomFormChange(e)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <span className="card-text text-white"><FaUserAlt/> Apellidos</span>
                            <Input
                                className='form-control form-field' 
                                type="text" 
                                placeholder='Apellidos del colaborador'
                                name="last_name" value={formData.last_name}
                                onChange={e=>onCustomFormChange(e)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <span className="card-text text-white"><FaPhoneAlt/> Teléfono</span>
                            <Input
                                className='form-control form-field' 
                                type="text" 
                                placeholder='Número telefónico del colaborador'
                                name="phone_number" value={formData.phone_number}
                                onChange={e=>onCustomFormChange(e)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <span className="card-text text-white"><FaEnvelope/> Correo electrónico</span>
                            <Input
                                className='form-control form-field' 
                                type="email" 
                                placeholder='Correo electrónico del colaborador'
                                name="email" value={formData.email}
                                onChange={e=>onCustomFormChange(e)}
                                required
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ToastContainer
					toastClassName='text-center'
					position='bottom-center'
					autoClose={false}
					closeOnClick
					newestOnTop={false}
					rtl={false}
					hideProgressBar={true}
					theme='colored'
            	/>
                <ModalFooter style={{background: '#880808'}}>
                    <Button
                        color="warning"
                        onClick={() => onSave(formData, toast)}
                    >
                        Guardar Cambios
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default AddProModal;