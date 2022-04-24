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
import CustomForm from './CustomForm';


const CustomModal = (props) => {

    const [activeItem, setActiveItem] = useState(props.activeItem);

    const handleChange = (e) =>{
        let { name, value } = e.target;

        if (e.target.type === 'checkbox'){
            value = e.target.checked;
        }

        const activeItem = {...activeItem, [name]: value};

        setActiveItem({activeItem});


    };

    const { toggle, onSave } = props;



    return (
      <div className=''>
        <Modal isOpen={true} centered={true} toggle={toggle} fullscreen={'xl'}>
          <ModalHeader  toggle={toggle} style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 20%), url(${props.pymeImage})`, 
                                                backgroundSize: 'cover',
                                                color: 'white'}}>
              {props.pymeName} 
              <br></br>
              <p style={{fontSize: '65%'}}>{props.pymeAddress}</p>
          
          </ModalHeader>
          <ModalBody>
            <CustomForm customForm={props.customForm} onSave={onSave} activeItem={activeItem}/>
          </ModalBody>
          <ModalFooter style={{background: '#880808'}}>
            <Button
              color="warning"
              onClick={() => onSave(activeItem)}
            >
              Agendar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
};
export default CustomModal;