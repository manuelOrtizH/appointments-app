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
			modalVet: false,
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
		this.setState({ modalVet: !this.state.modalVet });
	};

	handleVet = (item) => {
		this.toggle();

		// if (this.setState.vet) {
		// axios
		// 	.put(`http://localhost:8000/api/veterinaries/${this.setState.vet.length + 1}/`, item)
		// 	.then((res) => this.refreshList());
		// return;
		// }
		console.log('Handle Vet')
		axios
		.post("http://localhost:8000/api/appointments/", this.setState.prevAppt)
		.catch((err) => console.log(err));
		

		axios
		.post(`http://localhost:8000/api/veterinaries/`, item)
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
		const appt = { date: '', 
					   reason: 'Visita al Vet', company: 2, user: 1, professionist: 2, completed: false }
		// const l = this.setState.appointments.length || 0 
		const apptVet = { pet_name: "", animal: "", pet_age: 4, pet_medical_history: "", 
						  appointment: 3}

		this.setState({ activeItem: apptVet, modalVet: !this.state.modalVet, prevAppt: appt });
	}

	createItem = () => {
		const item = { title: "", description: "", completed: false };

		this.setState({ activeItem: item, modalVet: !this.state.modalVet });
	};

	editItem = (item) => {
		this.setState({ activeItem: item, modalVet: !this.state.modalVet });
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
		var pymes = new Map();
		this.state.pymes.filter(el => {
			pymes.set(el.id, el)
		});

		var profesionals = new Map();
		this.state.professionals.filter(el => {
			profesionals.set(el.id, el)
		});
		
		
		const vets = this.state.vets.filter((vet) => vet);
		const beauty = this.state.beauty.filter((beauty) => beauty);
		
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
			
			<i>{pymes.get(appt.company).name}</i><br></br>
			<b>{appt.reason} </b> <br></br>
			{appt.date} <br></br>
			<b>Responsable: </b> {profesionals.get(appt.professionist).first_name} {profesionals.get(appt.professionist).last_name}
			
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
				onClick={() => this.handleCompleted(appt, appt.id)}
			>
				Marcar como completada
			</button>
			<button
				className="btn btn-danger mt-3"
				onClick={() => this.handleDelete(appt.id)}
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
					// onClick={this.createItem}
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
			{this.state.modalVet ? (
			<ModalVet
				activeItem={this.state.activeItem}
				toggle={this.toggle}
				onSave={this.handleVet}
			/>
			) : null}
		</main>
		);
	}
}

export default App;