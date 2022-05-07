import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Route, Link, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => {
    // <Fragment
        // {...rest}
        return /*={props =>*/isAuthenticated ? <Outlet/> : <Navigate to='/' replace={true} /> 
    // />
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(PrivateRoute);