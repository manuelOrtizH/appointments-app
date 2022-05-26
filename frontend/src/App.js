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
import Appointment from './components/userComponents/appointments/Appointments';
import { Provider } from 'react-redux';
import store from './store';
// import PrivateRoute from './hocs/PrivateRoute';
import Layout from './hocs/Layout';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import PymeDashboard from './components/adminComponents/pyme/PymeDashboard';
import EasterEgg from './components/EasterEgg';
import Calendar from './components/userComponents/calendar/Calendar';
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
						<Route path='/profile/edit-profile/:id' element={<EditProfile/>}/>
						<Route exact path='/home' element={<Dashboard/>}/>
						<Route path='/signup' element={<Signup/>}/>
						<Route path='/reset-password' element={<ResetPassword/>}/>
						<Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
						<Route path='/activate/:uid/:token' element={<Activate/>}/>
						<Route path='/pyme/edit-pyme/:id' element={<PymeDashboard/>}/>
						<Route exact path='/appointment' element={<Appointment/>}/>
						<Route exact path='/jlm_el_mejor_profe' element={<EasterEgg/>}/>
						<Route exact path='/calendar' element={<Calendar/>}/>
						<Route path='/pyme/:id' element={<Pyme/>}/>
					</Routes>
				</Layout>
			</Router>
		</Provider>
	);
}
export default App;