import React from 'react';
import axios from 'axios';

const Dashboard = () => {
    const uid = localStorage.getItem('userId');
    
    console.log('uid ' + uid);
    return (
        <div>
            Dashboard
        </div>
    );

};

export default Dashboard;