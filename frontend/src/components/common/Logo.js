import React from 'react';
import { Link } from 'react-router-dom';

export function Logo(){
    return (
        <div className="logo-main">
            <Link to='/' >
                <img src="https://i.ibb.co/vPP6TWZ/logo-main.png" width="200px"></img>
            </Link>
            
        </div>
    );
}