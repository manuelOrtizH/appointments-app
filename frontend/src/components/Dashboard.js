import React from 'react';
import axios from 'axios';

const Dashboard = () => {
    const user = localStorage.getItem('user');
    console.log(user);
    return (
        <div>
            Dashboard
        </div>
    );

};

export default Dashboard;