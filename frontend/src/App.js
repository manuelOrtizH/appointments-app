import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import './App.css';
import Home from './containers/Home';
import Activate from './containers/Activate';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Dashboard from './components/common/Dashboard';
import Appointment from './components/common/appointments/Appointments';
import { Provider } from 'react-redux';
import store from './store';
// import PrivateRoute from './hocs/PrivateRoute';
import Layout from './hocs/Layout';
import Profile from './components/profile/Profile';
import PymeDashboard from './components/adminComponents/pyme/PymeDashboard';
import Calendar from './components/common/Calendar';
import Pyme from './components/userComponents/pyme/InfoPyme';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Layout>
					<Routes>
						<Route path='/' element={<Home/>}/>
						<Route path='/login' element={<Login/>}/>
						<Route path='/profile' element={<Profile/>}/>
						<Route exact path='/home' element={<Dashboard/>}/>
						<Route path='/signup' element={<Signup/>}/>
						<Route path='/reset-password' element={<ResetPassword/>}/>
						<Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
						<Route path='/activate/:uid/:token' element={<Activate/>}/>
						<Route path='/pyme/edit-pyme/:id' element={<PymeDashboard/>}/>
						<Route exact path='/appointment' element={<Appointment/>}/>
						<Route exact path='/calendar' element={<Calendar/>}/>
						<Route path='/pyme/:id' element={<Pyme/>}/>
					</Routes>
				</Layout>
			</Router>
		</Provider>
	);
}
export default App;