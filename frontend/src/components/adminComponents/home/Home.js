import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import NextAppts from '../../common/NextAppts';
import CreatePyme from '../pyme/CreatePyme';

const Home = ({admin, user, pymes, userAppts, professionals, appointments, businessLines}) => {
    // const isNewAdmin = user[0].owned_pyme === null ? true : false;
    const pyme = pymes.filter(el=>el.admin === admin.id);
    const isNewAdmin = pyme.length > 0 ? false : true;
    const [isLoading, setIsLoading] = useState(false);
    // const [pyme, setPyme] = useState([]);
    const newAppointments = userAppts.map(el => el.id);
    let filteredAppts = [];
    const id = pyme.length > 0 ? pyme[0].id : '';
    if(!isNewAdmin){
        filteredAppts = userAppts.filter(el => el.pyme === id);
        // pyme = pymes.filter(el => el.id === id)[0];
    }

    return(
        <div>
            {!isNewAdmin && 
                <div>
                    <h1 style={{fontWeight: 'bold'}} className='text-black text-center'>Próximas citas de <br></br>  <i style={{color: '#880808'}}>{pyme[0].name}</i></h1>
                    <NextAppts
                        userAppts={filteredAppts}
                        professionals={professionals} 
                        appointments={newAppointments}
                        pymes={pymes}
                        isAdmin={true}
                    />
                    <h1 style={{fontWeight: 'bold'}} className='text-black text-center'>Dale un vistazo a tu PyME</h1>

                    <div className='row'>
                        <div className='col text-center'>
                            <Link 
                                className='btn btn-warning btn-lg text-center mt-3' 
                                type='button' 
                                to={{ pathname: `/pyme/edit-pyme/${id}`}}
                                > 
                                Ver PyME
                            </Link>
                        </div>
                    </div>
                    

                </div>
            }

            {isNewAdmin && 
                <CreatePyme
                    admin={admin}
                />
            }

            
        </div>
    );
};
export default Home;