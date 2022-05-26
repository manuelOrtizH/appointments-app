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

import { FaBuilding, FaLocationArrow, FaQuoteLeft, FaBook, FaSplotch } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { businesLinesOptions } from '../../../../actions/businessLines';

const EditPymeModal = (props) => {
    const [formData, setFormData] = useState(props.customForm);
    const listOptions = [...businesLinesOptions()];
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
                            <span className="card-text text-white">
                                <FaBuilding style={{color: 'white', marginRight: '5px'}}/>
                                Nombre
                            </span>
                            <Input
                                className='form-control form-field'
                                type='text'
                                placeholder='Nombre de tu PyME'
                                name='name'
                                value={formData.name}
                                onChange={e=>onCustomFormChange(e)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <span className="card-text text-white">
                                <FaLocationArrow style={{color: 'white', marginRight: '5px'}}/>
                                Dirección
                            </span>
                            <Input
                                className='form-control form-field'
                                type='text'
                                placeholder='Dirección de tu PyME'
                                name='address'
                                value={formData.address}
                                onChange={e=>onCustomFormChange(e)}
                                required
                            />
                        </FormGroup>
                            
                            <FormGroup>
                                
                                <span className="card-text text-white">
                                    <FaQuoteLeft style={{color: 'white', marginRight: '5px'}}/>
                                    Slogan
                                </span>
                                <Input
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Un slogan'
                                    name='slogan'
                                    value={formData.slogan}
                                    onChange={e=>onCustomFormChange(e)}
                                    
                                />
                            </FormGroup>
                            <div className='form-group'>
                                
                                <span className="card-text text-white">
                                    <FaBook style={{color: 'white', marginRight: '5px'}}/>
                                    Descripción
                                </span>
                                <Input
                                    style={{overflow: 'hidden', resize:'none'}}
                                    className='form-control form-field'
                                    type='textarea'
                                    placeholder='Descripción de tu pyme'
                                    name='description'
                                    value={formData.description}
                                    onChange={e=>onCustomFormChange(e)}
                                    
                                />
                            </div>
                            <div className='form-group'>
                                <span className="card-text text-white">
                                    <FaSplotch style={{color: 'white', marginRight: '5px'}}/>
                                    Giro:
                                </span>
                                <Input
                                    className='scroll form-control form-field'
                                    name='business_line'
                                    value={formData.business_line}
                                    size='1'
                                    type='select'
                                    placeholder='Escoge tu giro'
                                    onChange={e=>onCustomFormChange(e)}
                                    required
                                >
                                <option value=''></option>
                                {listOptions}
                                <option value='Otro'>Otro</option>
                                </Input>
                            </div>
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
export default EditPymeModal;