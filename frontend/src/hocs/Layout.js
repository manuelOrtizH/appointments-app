import React from 'react';
import Navbar from '../components/common/Navbar';

const Layout = (props) => (
    <div>
        <Navbar/>
        {props.children}
    </div>
);

export default Layout;