import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import './App.css';
import Home from './containers/Home';
import Activate from './containers/Activate';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import BusinessLine from './components/businessLine/BusinessLine';
import Dashboard from './components/Dashboard';
import Appointment from './components/appointments/Appointments';
import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';


const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Layout>
					<Routes>
						<Route path='/' element={<Home/>}/>
						<Route path='/login' element={<Login/>}/>
						<Route path='/home' element={<Dashboard/>}/>
						<Route path='/signup' element={<Signup/>}/>
						<Route path='/reset-password' element={<ResetPassword/>}/>
						<Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
						<Route path='/activate/:uid/:token' element={<Activate/>}/>
						<Route path='/appointment' element={<Appointment/>}/>
					</Routes>
				</Layout>
			</Router>
		</Provider>
	);
}
export default App;