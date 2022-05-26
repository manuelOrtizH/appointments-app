import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import NextAppts from '../../common/NextAppts';
import CreatePyme from '../pyme/CreatePyme';

const Home = ({admin, user, clients, pymes, userAppts, professionals, appointments, businessLines}) => {
    const pyme = pymes.filter(el=>el.admin === admin.id);
    const isNewAdmin = pyme.length > 0 ? false : true;
    const pymeAppointments = userAppts.map(el => el.id);
    let filteredAppts = [];
    const id = pyme.length > 0 ? pyme[0].id : '';
    if(!isNewAdmin){
        filteredAppts = userAppts.filter(el => el.pyme === id);
    };
    

    return(
        <div>
            {!isNewAdmin && 
                <div>
                    <h1 style={{fontWeight: 'bold'}} className='text-black text-center'>Próximas citas de <br></br>  <i style={{color: '#880808'}}>{pyme[0].name}</i></h1>
                    <NextAppts
                        userAppts={filteredAppts}
                        professionals={professionals} 
                        appointments={pymeAppointments}
                        pymes={pymes}
                        isAdmin={true}
                        clients={clients}
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