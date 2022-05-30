import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getPyme, getAllProfessionals } from '../../../actions/api';
import Loading from '../../common/Loading';
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import EditFieldsModal from './modals/EditFieldsModal';
import AddFieldModal from './modals/AddFieldsModal';
import { handlePyme, handleProfessional } from '../../../actions/api';
import Alert from 'sweetalert2';
import AddProModal from './modals/AddProModal';
import EditPymeModal from './modals/EditPymeModal';
import Avatar from '@mui/material/Avatar';
import { list } from 'firebase/storage';

const PymeDashboard = () => {
    const { id } = useParams();
    const [modalEditField, setModalEditField] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const [modalAddField, setModalAddField] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const [modalAddPro, setModalAddPro] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const [modalEditPyme, setModalEditPyme] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const [pyme, setPyme] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const customDataForm = [];
    const invertedCustomDataForm = {}
    const [professionals, setProfessionals] = useState([]);
    const [professionalForm, setProfessionalForm] = useState({
        name: '',
        last_name: '',
        phone_number: '',
        email: '',
        calendar: {},
        profile_image: 'https://i0.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?ssl=1'
    });
    
    useEffect(async () => {
        setIsLoading(true);
        await getPyme(id, setPyme);
        await getAllProfessionals(setProfessionals);
        setIsLoading(false);
    }, []);
    const numEmployees = 0;
    const pymeInfo = pyme ? pyme : [];
    // if(pyme){
    //     pyme.map(el=> {
    //         console.log(el.employees)
    //     });
    // }

    const filteredProfessionals = professionals ? professionals.filter(el=> pyme.employees.includes(el.id)) : [];
    const listColaborators = [];
    if(filteredProfessionals){
        filteredProfessionals.map(el=>{
            listColaborators.push(
                <div key={el.id}>
                    <div >
                        <h6 style={{color: 'green'}}>{el.name} {el.last_name} : {el.phone_number}</h6>
                    </div>
                </div>

            );
        })
        
    }

    console.log(filteredProfessionals);

    const deleteField = k => {
        const tempInfo = pyme.custom_data_form;
        delete tempInfo[k];
        pymeInfo.custom_data_form = tempInfo;
        handlePyme(pymeInfo, setPyme);
    };

    
    if (pymeInfo.custom_data_form){
        let counter = 1;
        for(const[k,v] of Object.entries(pymeInfo.custom_data_form)){
            customDataForm.push(
            <div key={k}>
                <div className='row'>
                    <div className='col text-center' key={k}>
                        <button className='btn' onClick={() => deleteField(k)} ><FaTrash style={{color: '#880808'}} /></button>
                    </div>
                    <div className='col text-center'>
                        <h5 className='card-title text-center' style={{color: 'gray'}}><b>- {k} -</b></h5>
                    </div>
                    <div className='col'>
                        
                    </div>
                </div>
                <br></br>
            </div>);
            invertedCustomDataForm[counter] = k;
            counter+=1;
        };
        
    };

    const phoneValidation = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        return !(!phone || regex.test(phone) === false || phone.length != 10);
    }

    const editFieldModalToggle = () => setModalEditField({ modal: !modalEditField.modal });
    const addFieldModalToggle = () => setModalAddField({ modal: !modalAddField.modal });
    const addProModalToggle = () => setModalAddPro({modal: !modalAddPro.modal});
    const editPymeModalToggle = () => setModalEditPyme({modal: !modalEditPyme.modal});

    const handleSubmitEditField = (formData) => {
        editFieldModalToggle();
        const finalFormData = {}
        for(const[k,v] of Object.entries(formData)){
            finalFormData[v]= ' '
        };
        pymeInfo.custom_data_form = finalFormData;
        handlePyme(pymeInfo, setPyme);
        Alert.fire("Campos Editados!", `Tus cambios se han hecho con éxito`, "success");
    };

    const handleSubmitAddPro = (formData, toast) => {
        
        if(!phoneValidation(formData.phone_number)){
            toast.error('El número telefónico ingresado no es válido.');
        }else{
            handleProfessional(formData, pyme);
            addProModalToggle();
            Alert.fire("Colaborador registrado!", `Has registrado con éxito a un colaborador`, "success");
            window.location.reload();
            
        }
    };

    const handleSubmitAddField = (formData, customFormData) => {
        addFieldModalToggle();
        const finalFormData = {};
        if(formData){
            for(const[k,v] of Object.entries(formData)){
                finalFormData[v]= ' ';
            };
        };

        if(customFormData){
            for(const[k,v] of Object.entries(customFormData)){
                finalFormData[v]= ' ';
            };
        };
        
        for(const[k,v] of Object.entries(pymeInfo.custom_data_form)){
            finalFormData[k] = ' '
        }
        pymeInfo.custom_data_form = finalFormData;
        handlePyme(pymeInfo, setPyme);
        Alert.fire("Campos agregados!", `Has registrado con éxito más campos`, "success");
    };

    const handleSubmitEditPyme = (formData) => {
        handlePyme(formData, setPyme);
        editPymeModalToggle();
        Alert.fire("PyME Editada!", `Tus cambios se han hecho con éxito`, "success");
    }

    const handleEditField = (item) => setModalEditField({ apptForm: pyme.custom_data_form, modal: !modalEditField.modal });
    const handleAddField = (item) => setModalAddField({ apptForm: pyme.custom_data_form, modal: !modalEditField.modal });
    const handleAddPro = (item) => setModalAddPro({ apptForm: pyme.custom_data_form, modal: !modalEditField.modal });
    const handleEditPyme = (item) => setModalEditPyme({ apptForm: pyme.custom_data_form, modal: !modalEditPyme.modal });

    return (
        <div>
             <article className='profile card  mt-5 mb-5' style={{marginRight: '5vh', marginLeft: '5vh'}}>
                <div>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            {!isLoading && pymeInfo && filteredProfessionals &&
                                <div>
                                    <h1 className='card-title text-center' style={{color: '#880808'}}><b>{pymeInfo.name}</b></h1>
                                    <hr></hr>
                                    <a className='card-title text-center'>
                                        <div className='row'>
                                            <div className='col text-center'>
                                                <Avatar
                                                    alt="image-pyme"
                                                    src={pymeInfo.image_url}
                                                    style={{alignSelf: 'center', marginLeft: '47%'}}
                                                    sx={{ width: 120, height: 120 }}
                                                />
                                            </div>
                                        </div>

                                    </a>
                                    <br></br>
                                    <h5 className='card-title text-center mt-5'>Dirección</h5>
                                    <h5 className='card-title text-center '><b>{pymeInfo.address}</b></h5>
                                    <hr></hr>
                                    <h5 className='card-title text-center mt-5'>Slogan</h5>
                                    <h5 className='card-title text-center '><b>{pymeInfo.slogan}</b></h5>
                                    <hr></hr>
                                    <h5 className='card-title text-center mt-5'>Descripción</h5>
                                    <h5 className='card-title text-center '><b>{pymeInfo.description}</b></h5>
                                    <hr></hr>
                                    <h5 className='card-title text-center mt-5'>Colaboradores </h5>
                                    {listColaborators}
                                    
                                    <button className='btn btn-success' onClick={handleAddPro} href='#'><FaPlus style={{color: 'white'}}/> Agregar Colaboardor</button>
                                    <hr></hr>
                                    <h5 className='card-title text-center'>Giro</h5>
                                    <h5 className='text-center'><b>{pymeInfo.business_line}</b></h5>
                                    <hr></hr>
                                    <h6 className='mt-5 mb-3'><i style={{fontWeight: '800'}}>Crea los campos que necesite llevar tu cita para llevarla a cabo</i></h6>
                                    <div className="accordion" id="accordionPanelsStayOpenExample" >

                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                                <button className="btn btn-block accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne" >
                                                <h2 className='mb-4'>Datos de mi cita  </h2>
                                                
                                                </button>
                                                
                                            </h2>
                                            
                                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                            <div className='row'>
                                                <div className='col text-right mr-5'>
                                                    <button className='btn btn-success mr-2' onClick={handleAddField} href='#'><FaPlus style={{color: 'white'}}/> Agregar Campos</button>
                                                    <button className='btn btn-warning' onClick={handleEditField} href='#'><FaEdit style={{color: 'black'}}/> Editar</button>
                                                </div>
                                            </div>
                                            
                                                <div className="accordion-body">
                                                <strong>                                    
                                                    
                                                    {customDataForm.length > 0 && customDataForm}
                                                    {customDataForm.length <= 0 && <p style={{color: 'red'}}>Agrega datos a tu cita</p>}
                                                </strong> 
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {!isLoading && pyme.length <= 0 && <p>No hay información de una cita</p>}
                            {isLoading && <Loading/>}
                        </div>
                    </div>
                    <div className='card-header no-border'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col text-center'>
                                    <button onClick={ handleEditPyme } className='btn btn-warning'>Editar <b>{pyme.name}</b></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </article>
                                        
            {modalEditField.modal ? (
                <EditFieldsModal
                    activeItem={modalEditField.activeItem}
                    toggle={editFieldModalToggle}
                    onSave={handleSubmitEditField}
                    customForm={invertedCustomDataForm}
                    isEdit={true}
                />
            ) : null}
            {modalAddField.modal ? (
                <AddFieldModal
                    activeItem={modalAddField.activeItem}
                    toggle={addFieldModalToggle}
                    onSave={handleSubmitAddField}
                    businessLine={pymeInfo.business_line}
                />
            ) : null}
            {modalAddPro.modal ? (
                <AddProModal
                    activeItem={modalAddPro.activeItem}
                    toggle={addProModalToggle}
                    onSave={handleSubmitAddPro}
                    customForm={professionalForm}
                />
            ) : null}
            {modalEditPyme.modal ? (
                <EditPymeModal
                    activeItem={modalEditPyme.activeItem}
                    toggle={editPymeModalToggle}
                    onSave={handleSubmitEditPyme}
                    customForm={pyme}
                />
            ) : null}

        </div>
    );
};
export default PymeDashboard;