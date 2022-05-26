import React, {useState} from 'react';
import { FaBuilding, FaLocationArrow, FaQuoteLeft, FaBook, FaSplotch } from "react-icons/fa";
import '../../common/styles/Form.css';
import { registerPyme } from '../../../actions/api';
import { Link, useParams, useNavigate, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CreatePyme = ({admin}) => {
    let navigate = useNavigate();
    const [pyme, setPyme] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        slogan: '',
        description: '',
        business_line: '',
        custom_data_form: {},
        employees: [],
        image_url: 'https://pngimg.com/uploads/letter_r/letter_r_PNG93904.png',
        admin: admin.id,
    });
    
    const listOptions = [];

    const businesLines = ['Entretenimiento', 'Salud', 'Comida', 'Derecho', 'Educación', 'Belleza', 'Música']
    let index=0;
    for(const bL of businesLines){
        index+=1;
        listOptions.push(
            <option key={index} value={bL}>{bL}</option>
        );
    }



    const { name, address ,slogan, description, business_line } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) =>{
        e.preventDefault();
        registerPyme(formData, admin);
        // navigate("/home", { replace: true });
        window.location.reload();
    };


    return(
        <div>
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
            <div>
                <h1 className='text-center' style={{fontWeight: '750'}}> Es momento de iniciarte y registrar tu PyME</h1>
            </div>
            
            <div className='container'>
                
                <div className='mt-5 mb-3'>

                    <div className='card-body card-body-form' >
                        <p className="card-text text-center">Llena los siguientes datos!</p>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className='form-group'>
                                <span className="card-text text-white">
                                    <FaBuilding style={{color: 'white', marginRight: '5px'}}/>
                                    Nombre
                                </span>
                                <input
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Nombre de tu PyME'
                                    name='name'
                                    value={name}
                                    onChange={e=>onChange(e)}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <span className="card-text text-white">
                                    <FaLocationArrow style={{color: 'white', marginRight: '5px'}}/>
                                    Dirección
                                </span>
                                <input
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Dirección de tu PyME'
                                    name='address'
                                    value={address}
                                    onChange={e=>onChange(e)}
                                    required
                                />
                            </div>
                            
                            <div className='form-group'>
                                
                                <span className="card-text text-white">
                                    <FaQuoteLeft style={{color: 'white', marginRight: '5px'}}/>
                                    Slogan
                                </span>
                                <input
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Un slogan'
                                    name='slogan'
                                    value={slogan}
                                    onChange={e=>onChange(e)}
                                    
                                />
                            </div>
                            <div className='form-group'>
                                
                                <span className="card-text text-white">
                                    <FaBook style={{color: 'white', marginRight: '5px'}}/>
                                    Descripción
                                </span>
                                <textarea
                                    style={{overflow: 'hidden', resize:'none'}}
                                    className='form-control form-field'
                                    type='text'
                                    placeholder='Descripción de tu pyme'
                                    name='description'
                                    value={description}
                                    onChange={e=>onChange(e)}
                                    
                                />
                            </div>
                            <div className='form-group'>
                                <span className="card-text text-white">
                                    <FaSplotch style={{color: 'white', marginRight: '5px'}}/>
                                    Giro:
                                </span>
                                <select
                                    className='scroll form-control form-field'
                                    name='business_line'
                                    value={business_line}
                                    size='1'
                                    type='select'
                                    placeholder='Escoge tu giro'
                                    onChange={e=>onChange(e)}
                                    required
                                >
                                <option value=''></option>
                                {listOptions}
                                <option value='Otro'>Otro</option>
                                </select>
                            </div>
                            <h6 className='form-group text-right'><i>*No es necesario tener un slogan o descripción</i></h6>
                            <hr></hr>
                            <div className='row'>
                                <div className='col text-center'>
                                    <h5 className='text-center mb-3 mt-3'>Más adelante podrás crear los campos de tu cita que requieras</h5>
                                    <button className='btn btn-warning btn-lg' type='submit'> Registar PyME</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    );
};
export default CreatePyme;