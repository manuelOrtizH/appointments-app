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
			modalBeauty: false,
			activeItem: {},
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

	toggleV = () => {
		this.setState({ modalVet: !this.state.modalVet });
	};

	toggleB = () => {
		this.setState({ modalBeauty: !this.state.modalBeauty })
	};

	handleVet = (item) => {
		this.toggleV();

		if (item.id) {
		axios
			.put(`http://localhost:8000/api/veterinaries/${item.id}/`, item)
			.then((res) => this.refreshList());
		return;
		}

		axios
		.post(`http://localhost:8000/api/veterinaries/`, item)
		.then((res) => this.refreshList());
	};

	handleBeauty = (item) => {
		this.toggleB();

		if (item.id) {
		axios
			.put(`http://localhost:8000/api/beautyshops/${item.id}/`, item)
			.then((res) => this.refreshList());
		return;
		}

		axios
		.post(`http://localhost:8000/api/beautyshops/`, item)
		.then((res) => this.refreshList());

		
	}

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
		const appt = { pet_name: "", animal: "", pet_age: "", pet_medical_history: "", }
		this.setState({ activeItem: appt, modalVet: !this.state.modalVet});
	}

	beautyAppt = () => {
		const appt = { style_type: "", hair_type: "", hair_treatment: ""}
		this.setState({ activeItem: appt, modalBeauty: !this.state.modalBeauty});
	}


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
					onClick={this.beautyAppt}
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
				toggle={this.toggleV}
				onSave={this.handleVet}
			/>
			) : null}
			{this.state.modalBeauty ? (
			<ModalBeauty
				activeItem={this.state.activeItem}
				toggle={this.toggleB}
				onSave={this.handleBeauty}
			/>
			) : null}
		</main>
		);
	}
}

export default App;