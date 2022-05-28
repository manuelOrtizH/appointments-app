import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate, Route } from 'react-router-dom';
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
import { getPyme } from '../../../../actions/api';
import { FaBuilding, FaLocationArrow, FaQuoteLeft, FaBook, FaSplotch } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { businesLinesOptions } from '../../../../actions/businessLines';
import Avatar from '@mui/material/Avatar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditPymeModal = (props) => {

    const { id } = useParams();
    const [pyme, setPyme] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);
        await getPyme(id,setPyme);
        
        setIsLoading(false);
    }, []);

    const pyme_1 = pyme ? pyme: [];
    const [image, setImage] = useState(pyme_1 ? pyme_1:'');

    const [formData, setFormData] = useState(props.customForm);
    const listOptions = [...businesLinesOptions()];
    const onCustomFormChange = (e) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log('form: ', formData);
    };  

    const storage = getStorage();
    const storageRef = ref(storage, formData.id);

    const onImageChange = e => {
        //Lo que ahorita de diga poner
        let img = e.target.files[0];
        setImage(URL.createObjectURL(img));
        console.log('form', formData);
        uploadBytes(storageRef, img).then((snapshot) => {
            console.log('Uploaded the image!');
        });

        console.log('formdata', formData);

        setTimeout(() => {
            getDownloadURL(storageRef).then(url => {
                console.log('Download URL', url);
                setFormData({...formData, image_url: url });
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
                Datos de colaborador
                </ModalHeader>
                <ModalBody>
                    <p className='text-center'>Completa los datos para agregar a un profesional</p>
                    <Form>
                        <FormGroup>

                            <Avatar
                                alt="image-pyme"
                                src={formData.image_url}
                                style={{alignSelf: 'center'}}
                                sx={{ width: 90, height: 90 }}
                            />
                            <label className='btn btn-success btn-lg mr-5' htmlFor="img_id" style={{marginLeft: '10%', marginTop: '5%', padding:"1px 10px" }}>Seleccionar imagen</label>
                            <input id='img_id' style={{marginLeft: '20vh', visibility:"hidden"}} type='file' name='profile_image' onChange={e=>onImageChange(e)}></input>
                            

                        </FormGroup>
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
                                Direcci贸n
                            </span>
                            <Input
                                className='form-control form-field'
                                type='text'
                                placeholder='Direcci贸n de tu PyME'
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
                                    Descripci贸n
                                </span>
                                <Input
                                    style={{overflow: 'hidden', resize:'none'}}
                                    className='form-control form-field'
                                    type='textarea'
                                    placeholder='Descripci贸n de tu pyme'
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