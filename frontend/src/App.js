import React, { Component } from "react";
import { Header } from './components/Navbar/Header'
import ModalVet from "./components/ModalVet";
import ModalBeauty from "./components/ModalBeauty";
import axios from "axios";


class App extends Component {
	
	constructor(props) {
	super(props);
	
		this.state = {
			viewCompleted: false,
			appointments: [],
			pymes: [],
			vets: [],
			beauty: [],
			professionals: [],
			modal: false,
			activeItem: {
			reason: "",
			date: "",
			completed: false,
			prevAppt: {},
			},
		};

	
		
	}

	componentDidMount() {
		this.refreshList();
		
	}

	refreshList = () => {
		axios.get("http://localhost:8000/api/pymes/")
		.then((res) => this.setState({ pymes: res.data }))
		.catch((err) => console.log(err));

		axios.get("http://localhost:8000/api/appointments/")
		.then((res) => this.setState({ appointments: res.data }))

		axios.get("http://localhost:8000/api/veterinaries/")
		.then((res) => this.setState({ vets: res.data }))
		.catch((err) => console.log(err));

		axios.get("http://localhost:8000/api/beautyshops/")
		.then((res) => this.setState({ beauty: res.data }))
		.catch((err) => console.log(err));

		axios.get("http://localhost:8000/api/proffessionists/")
		.then((res) => this.setState({ professionals: res.data }))
		.catch((err) => console.log(err));


	
	};

	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};

	handleSubmit = (item) => {
		this.toggle();

		if (item.id) {
		axios
			.put(`/api/todos/${item.id}/`, item)
			.then((res) => this.refreshList());
		return;
		}
		axios
		.post("/api/todos/", item)
		.then((res) => this.refreshList());
	};

	handleCompleted = (item, id) => {
		item.completed = !item.completed
		axios
		.put(`http://localhost:8000/api/appointments/${id}/`,item)
		.then((res) => this.refreshList());
	};

	handleDelete = (id) => {
		console.log('Id when deleting: ' + id);
		axios
		.delete(`http://localhost:8000/api/appointments/${id}/`)
		.then((res) => this.refreshList());
	};

	vetAppt = () => {
		const appt = { date: new Date.now().toString(), 
					   reason: 'Visita al Vet', company: 2, user: 1, professionist: 2, completed: false }
		const apptVet = { petName: "", animal: "", petAge: 4, petMedHistory: "", 
						  appointment: this.setState.appointments.length + 2}

		this.setState({ activeItem: apptVet, modal: !this.state.modal, prevAppt: appt });
	}

	createItem = () => {
		const item = { title: "", description: "", completed: false };

		this.setState({ activeItem: item, modal: !this.state.modal });
	};

	editItem = (item) => {
		this.setState({ activeItem: item, modal: !this.state.modal });
	};

	displayCompleted = (status) => {
		if (status) {
		return this.setState({ viewCompleted: true });
		}

		return this.setState({ viewCompleted: false });
	};

	renderTabList = () => {
		return (
			
		<div className="nav nav-tabs">
			
			<span
			onClick={() => this.displayCompleted(true)}
			className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
			>
			Citas Completadas
			</span>
			<span
			onClick={() => this.displayCompleted(false)}
			className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
			>
			Citas Pendientes
			</span>

		</div>
		);
	};

	

  
		
	renderItems = () => {
		
		const { viewCompleted } = this.state;
		
		//Hard-code
		const appts = this.state.appointments.filter(
			(appt) => appt.completed === viewCompleted & appt.user === 1
		);

		const pymes = this.state.pymes.filter(el => el)
		//Hard-code
		const vets = this.state.vets.filter((vet) => vet.appointment === 2);
		const beauty = this.state.beauty.filter((beauty) => beauty.appointment === 1);
		
		return appts.map((appt, index) => (
		<li
			key={appt.id}
			className="list-group-item d-flex justify-content-between align-items-center"
		>
			<span
			className={`todo-title mr-2 ${
				this.state.viewCompleted ? "completed-todo" : ""
			}`}
			title={appt.reason}
			>
			{appt.id}
			<i>{pymes[appt.company - 1].name}</i><br></br>
			<b>{appt.reason} </b> <br></br>
			{appt.date}
			
			</span>
			<span>
			{/* <button
				className="btn btn-secondary mr-2"
				onClick={() => this.editItem(appt)}
			>
				Editar
			</button> */}
			<button
				className="btn btn-warning"
				onClick={() => this.handleCompleted(appt, index+1)}
			>
				Marcar como completada
			</button>
			<button
				className="btn btn-danger mt-3"
				onClick={() => this.handleDelete(index+1)}
			>
				Eliminar
			</button>
			</span>
		</li>
		));

	};



	render() {

		return (
			
		<main className="container">
			<Header></Header>
			<div className="row mt-5">
			<div className="col-md-6 col-sm-10 mx-auto p-0">
				<div className="card p-3">
				<div className="mb-4">
					<button
					className="btn btn-primary mr-3"
					onClick={this.vetAppt}
					>
					Cita con Veterinaria
					</button>
					<button
					className="btn btn-primary"
					onClick={this.createItem}
					>
					Cita con Estetica
					</button>
				</div>
				{this.renderTabList()}
				<ul className="list-group list-group-flush border-top-0">
					{this.renderItems()}
				</ul>
				</div>
			</div>
			</div>
			{this.state.modal ? (
			<ModalVet
				activeItem={this.state.activeItem}
				toggle={this.toggle}
				onSave={this.handleSubmit}
			/>
			) : null}
		</main>
		);
	}
}

export default App;