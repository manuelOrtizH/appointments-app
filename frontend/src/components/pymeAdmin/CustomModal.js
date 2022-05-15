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

import { FaPenFancy } from 'react-icons/fa';

const CustomModal = (props) => {
    const [formData, setFormData] = useState(props.customForm);
    const onCustomFormChange = (e) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };  
    // let counter = 0;
    // for(const[k,v] of Object.entries(props.customForm)){
    //     counter+=1
    //     formData[counter] = k;
    // };    
    const listFormData = [];

    for (const[key,value] of Object.entries(formData)){
        listFormData.push( 
			<FormGroup key={key}>
				<span className="card-text text-white"><FaPenFancy/>Nombre Campo</span>
				<Input
					className='form-control form-field'
					type='text'
					placeholder=' '
					name={key}
					value={value}
					onChange={e=>onCustomFormChange(e)}
					required
				/>
			</FormGroup>
		);
    };

    const { toggle, onSave } = props;

    return(
        <div>
            <Modal isOpen={true} centered={true} toggle={toggle} fullscreen={'xl'}>
                <ModalHeader  toggle={toggle} style={{backgroundColor: 'white', 
                                                    color: 'black', textAlign: 'center'}}>
                Información de mi cita
                </ModalHeader>
                <ModalBody>
                    <p className='text-center'>Editar mi cita</p>
                    <Form>
                        {listFormData}
                    </Form>
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
export default CustomModal;