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
  import { ToastContainer, toast } from 'react-toastify';


const CustomModal = (props) => {

    const [formData, setFormData] = useState(props.customForm);
	const [professionals, setProfessionals] = useState(props.professionals);
	const [apptData, setApptData] = useState(props.apptForm)
    const listFormData = [];
	const listOptions = [];
	const buttonLabel = props.isEdit ? 'Editar' : 'Agendar'; 
	const modalLabel = props.isEdit ? 'Edite los campos que desee' : 'Ingrese los siguientes campos';
    const onCustomFormChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onApptFormChange = e => setApptData({ ...apptData, [e.target.name]: e.target.value });
        
	const filteredPros = professionals.filter(el=>props.pymeEmployees.includes(el.id));
	
	filteredPros.map((el,index)=>{
		const proName = `${el.name} ${el.last_name}`;
		listOptions.push(<option key={index} value={el.id}>{proName}</option>);
	});

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
				//Ver mas tipos 
                type = 'file';
        }
	
		listFormData.push( 
			<FormGroup key={key}>
				<span className="card-text text-white">{key}</span>
				<Input
					className='form-control form-field'
					type={type}
					placeholder=' '
					name={key}
					value={value}
					onChange={e=>onCustomFormChange(e)}
					required
				/>
			</FormGroup>
		);
	}

    const { toggle, onSave } = props;

    return (
      <div className=''>

		<Modal isOpen={true} size='lg' centered={true} toggle={toggle} fullscreen={'xl'}>
			<ModalHeader  toggle={toggle} style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 20%), url(${props.pymeImage})`, 
												backgroundSize: 'cover',
												color: 'white'}}>
				{props.pymeName} 
				<br></br>
				<p style={{fontSize: '65%'}}>{props.pymeAddress}</p>
			</ModalHeader>
			<ModalBody>
				<p className='text-center'>{modalLabel}</p>
				<Form>
					<FormGroup>
						<span className='card-text text-white'>
							Fecha
						</span>
						<Input
						 	className='form-control form-field' 
							type="datetime-local" id="date"
							name="date" value={apptData.date ? new Date(apptData.date).toISOString().slice(0,16) : ''}
							onChange={e=>onApptFormChange(e)}
						/>
					</FormGroup>
					{listFormData}
					<FormGroup>
						<span className='card-text text-white'>
							Razón
						</span>
						<Input
							className='form-control form-field'
							type='text'
							placeholder=' '
							name='reason'
							value={apptData.reason}
							onChange={e=>onApptFormChange(e)}
							required
						/>
					</FormGroup>
					<FormGroup>
						<span className="card-text text-white">
							Responsable
						</span>
						<Input 
							id='responsable'
							type='select'
							size='1'
							name='responsable'
							value={apptData.responsable}
							onChange={e=>onApptFormChange(e)}
						>
							<option value='' hidden></option>
							{listOptions}
						</Input>
					</FormGroup>
				</Form>
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
			</ModalBody>
			<ModalFooter style={{background: '#880808'}}>
				<Button
					color="warning"
					onClick={() => onSave(formData, apptData, toast)}
				>
					{buttonLabel}
				</Button>
			</ModalFooter>
		</Modal>
      </div>
    );
};

export default CustomModal;




