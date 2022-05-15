import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getPyme } from '../../actions/api';
import Loading from '../common/Loading';
import { FaEdit, FaTrash } from "react-icons/fa";
import CustomModal from './CustomModal';
import { handlePyme } from '../../actions/api';

const PymeDashboard = () => {
    const { id } = useParams();
    const [modalState, setModalState] = useState({viewCompleted: false, modal: false, apptForm: '' });
    const [pyme, setPyme] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const customDataForm = [];
    const invertedCustomDataForm = {}
    
    useEffect(async () => {
        setIsLoading(true);
        await getPyme(id, setPyme);
        setIsLoading(false);
    }, []);

    const pymeInfo = pyme;

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
                        <button className='btn' onClick={() => deleteField(k)} ><FaTrash style={{color: 'red'}} /></button>
                    </div>
                    <div className='col text-center'>
                        <h5 className='card-title text-center' style={{color: 'gray'}}><b>-- {k} --</b></h5>
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

    const toggle = () => setModalState({ modal: !modalState.modal });

    const handleSubmit = (formData) => {
        toggle();
        const finalFormData = {}
        for(const[k,v] of Object.entries(formData)){
            finalFormData[v]= ' '
        };
        pymeInfo.custom_data_form = finalFormData;
        handlePyme(pymeInfo, setPyme);
    };

    const handleEdit = (item) => setModalState({ apptForm: pyme.custom_data_form, modal: !modalState.modal });


    return (
        <div>
             <article className='profile card  mt-5 mb-5' style={{marginRight: '5vh', marginLeft: '5vh'}}>
                <div>
                    <div className='card-body'>
                        <div className='no-border text-center'>
                            {!isLoading && pyme &&
                                <div>
                                    <h1 className='card-title text-center' style={{color: '#880808'}}><b>{pyme.name}</b></h1>
                                    <hr></hr>
                                    
                                    <a className='card-title text-center'>
                                        <img src={pyme.image_url} style={{borderRadius: '50%', width: '20%'}}/>
                                    </a>
                                    <br></br>
                                    <h5 className='card-title text-center mt-5'><b>{pyme.address}</b></h5>
                                    <hr></hr>
                                    <h5 className='card-title text-center'><b>Giro: {pyme.business_line}</b></h5>
                                    <hr></hr>



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
                                                    <button className='btn btn-warning' onClick={handleEdit} href='#'><FaEdit style={{color: 'black'}}/></button>
                                                </div>
                                            </div>
                                            
                                                <div className="accordion-body">
                                                <strong>                                    
                                                    
                                                    {customDataForm}
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
                                    <button className='btn btn-warning'>Editar <b>{pyme.name}</b></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </article>
                                        
            {modalState.modal ? (
                <CustomModal
                    activeItem={modalState.activeItem}
                    toggle={toggle}
                    onSave={handleSubmit}
                    customForm={invertedCustomDataForm}
                    isEdit={true}
                />
            ) : null}
        </div>
    );
};
export default PymeDashboard;