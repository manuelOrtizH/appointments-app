import React, {useState} from 'react';
import {
    Button,
    ModalBody,
    ModalFooter,
} from "reactstrap";

const CustomForm = (customForm, onSave, activeItem) => {
    const [formData, setFormData] = useState(customForm.customForm);
    const listFormData = [];

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    }

    const onSubmit = (e) => {
        e.preventDefault(e);
        console.log('Submit: ', formData)
        
    };

        
    for (const [key,value] of Object.entries(formData)){
        let type = ''
        switch (typeof value){
            case 'string':
                type = 'text';
                break;
            case 'number':
                type = 'number';
                break;
            case 'boolean':
                type = 'checkbox';
                break;
            default:
                type = 'file';
        }

        listFormData.push( 
            <div className='form-group' key={key}>
                <span className="card-text text-white">
                    {/* <FaEnvelope style={{color: 'white', marginRight: '5px'}}/> */}
                    {key}
                </span>
                <input
                    className='form-control form-field'
                    type={type}
                    placeholder='Requerido'
                    name={key}
                    value={value}
                    onChange={e=>onChange(e)}
                    required
                />
            </div>
        );
    }


    return (
        <div>
            {/* <ModalBody>



            </ModalBody>
            <ModalFooter style={{background: '#880808'}}>
                <Button
                    color="warning"
                    type='submit'
                    onClick={() => onSave(activeItem)}
                    >
                    Save
                </Button>
            </ModalFooter> */}
            <form onSubmit={e => onSubmit(e)}>
                {listFormData}
            </form>
        </div>
    );
};
export default CustomForm;