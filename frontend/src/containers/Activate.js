import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify, props }) => {

    const [verified, setVerified] = useState(false);
    
    const { uid, token } = useParams();
    

    const verify_account = e =>{
        verify(uid,token);
        setVerified(true);
    };

    //Is the user authenticated
    //Redirect them to the home page
    if(verified){
        return (<Navigate to='/login' replace={true} />);
    }

    return (
        <div className='container'>
           <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px'}}
            >
                <h1>Verificar tu cuenta</h1>
                <button 
                    onClick={verify_account}
                    style={{ marginTop: '50px'}}
                    type='button'
                    className='btn btn-warning btn-lg'
                >
                    Verificar
                </button>

           </div>
        </div>
    );
};



export default connect(null, { verify })(Activate);