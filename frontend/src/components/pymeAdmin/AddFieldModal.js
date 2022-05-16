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

const AddFieldModal = (props) => {
    const [formData, setFormData] = useState({});
    const [customFormData, setCustomFormData] = useState();
    const myForm = {'Sangre': ' ', 'Medicinas': ' '}
    const options = [];
    const [fieldsCustom, setFieldsCustom] = useState([]);
    const [isManual, setIsManual] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [fieldsManual, setFieldsManual] = useState([]);
    
    const onFormChange = (e) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    for(const[k,v] of Object.entries(myForm)){
        options.push(<option key={k} value={k}>{k}</option>);
    }


    const onCustomFormChange = (e) => {
        console.log(customFormData);
        setCustomFormData({ ...customFormData, [e.target.name]: e.target.value });
    }; 
    
    const addManualField = () => setFieldsManual([...fieldsManual, { field: '' }]);

    const addCustomField = () => {
        setFieldsCustom([...fieldsCustom, { field: '' }]);

    };

    const deleteManualField = (index) => {
        const tempList = [...fieldsManual];
        tempList.splice(index,1);
        setFieldsManual(tempList);
    };

    const deleteCustomField = (index) => {
        const tempList = [...fieldsCustom];
        tempList.splice(index,1);
        setFieldsCustom(tempList);
    };


    const { toggle, onSave } = props;

    return(
        <div>
            <Modal isOpen={true} size='lg' centered={true} toggle={toggle} fullscreen={'xl'}>
                <ModalHeader  toggle={toggle} style={{backgroundColor: 'white', 
                                                    color: 'black', textAlign: 'left'}}>
                <p className='mb-2'>Creación de campos nuevos </p>
                    <Button
                    color="warning"
                    onClick={addManualField}
                    >
                    <FaPlus style={{color: 'black'}}/> Manual
                    </Button>
                    <Button
                    className='ml-3 text-black'
                    style={{backgroundColor: '#95C1D6', color:'black'}}
                    onClick={addCustomField}
                    >
                    <FaPlus style={{color: 'black'}}/> Customizable
                    </Button>

                </ModalHeader>
                <ModalBody>
                    <Form className='text-center'>
                    {fieldsManual.map((field,index) => (
                        <FormGroup key={index}>
                            
                            <button
                                className='btn mr-4'
                                onClick={deleteManualField}
                                > 
                                <FaTrash style={{color: '#880808'}}/>
                            </button>
                            
                            <span className="card-text text-white"><FaPenFancy/> Nombre Campo</span>
                            <Input
                                className='form-control form-field'
                                type='text'
                                placeholder=' '
                                name={index}
                                value={field[field]}
                                onChange={e=>onFormChange(e)}
                                required
                            />
                        </FormGroup>
                    ))}

                    {fieldsCustom.map((field,index) => (
                        <FormGroup key={index}>
                            <button
                                className='btn mr-4'
                                onClick={deleteCustomField}
                                > 
                                <FaTrash style={{color: '#880808'}}/>
                            </button>
                            <span style={{backgroundColor: '#95C1D6', color: 'black'}}className="card-text text-black"><FaPenFancy/> Nombre Campo</span>
                            <Input 
                                id='responsable'
                                type='select'
                                size='1'
                                name={index}
                                value={field[field]}
                                onChange={e=>onCustomFormChange(e)}
						    >
							<option value='' hidden></option>
							{options}
						</Input>
                        </FormGroup>
                            
                        
                    ))}

                    </Form>
                </ModalBody>
                <ModalFooter style={{background: '#880808'}}>
                    <div className='row'>

                        <div className='col-lg text-right'>
                            <Button
                                color="success"
                                onClick={() => onSave(formData, customFormData)}
                            > 
                                Guardar Cambios
                            </Button>
                        </div>
                    </div>

                </ModalFooter>
            </Modal>
        </div>
    );
};
export default AddFieldModal;