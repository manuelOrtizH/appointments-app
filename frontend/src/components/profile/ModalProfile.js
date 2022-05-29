import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
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
import Avatar from '@mui/material/Avatar';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ModalProfile = (props) => {

    const { id } = useParams();
    const [pyme, setPyme] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const pyme_1 = pyme ? pyme: [];
    const [image, setImage] = useState(pyme_1 ? pyme_1:'');

    const [formData, setFormData] = useState(props.customForm);
    const onCustomFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };  

    const storage = getStorage();
    const storageRef = ref(storage, formData.id);

    const onImageChange = e => {
        //Lo que ahorita de diga poner
        let img = e.target.files[0];
        setImage(URL.createObjectURL(img));
        
        uploadBytes(storageRef, img);

        

        setTimeout(() => {
            getDownloadURL(storageRef).then(url => {
                console.log('Download URL', url);
                setFormData({...formData, profile_image: url });
            }).catch((error) => {
                console.log('error: ', error);
            });
          }, 500);
    };

    const { toggle, onSave } = props;

    return(
        <div>
            <Modal isOpen={true} size='lg' centered={true} show={true} toggle={toggle} fullscreen={'xl'} >
                <ModalHeader  toggle={toggle} style={{backgroundColor: 'white', 
                                                    color: 'black', textAlign: 'center'}}>
                Datos de tu perfil
                </ModalHeader>
                <ModalBody>
                    <p className='text-center'>Edita los campos de tu perfil</p>
                    <Form>
                        <FormGroup>
                            <div className='row text-center'>
                                <div className='col'></div>
                                <div className='col text-center'>
                                    <Avatar
                                    alt="image-pyme"
                                    src={formData.profile_image}
                                    style={{alignSelf: 'center'}}
                                    sx={{ width: 90, height: 90 }}
                                    />
                                </div>
                                <div className='container text-center'>
                                    <label className='btn btn-success mt-5' htmlFor="img_id" >Seleccionar imagen</label>
                                </div>        
                            </div>

                            
                            <input id='img_id' style={{marginLeft: '20vh', visibility:"hidden"}} type='file' name='profile_image' onChange={e=>onImageChange(e)}></input>
                        </FormGroup>
                
                        <FormGroup>
                            <span className="card-text text-white">
                                Nombre(s)
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
                                Apellidos
                            </span>
                            <Input
                                className='form-control form-field'
                                type='text'
                                placeholder='Dirección de tu PyME'
                                name='last_name'
                                value={formData.last_name}
                                onChange={e=>onCustomFormChange(e)}
                                required
                            />
                        </FormGroup>
                            
                            <FormGroup>
                                <span className="card-text text-white">
                                    Slogan
                                </span>
                                <Input
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Un slogan'
                                    name='phone_number'
                                    value={formData.phone_number}
                                    onChange={e=>onCustomFormChange(e)}
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
export default ModalProfile;