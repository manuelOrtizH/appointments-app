import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
// const apptVet = { petName: "", animal: "", petAge: "", petMedHistory: ""}
export default class CustomModalVet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Veterinaria: Veterinaria La Lupe</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="pet_name">Nombre de tu mascota</Label>
              <Input
                type="text"
                id="vet-pet_name"
                name="pet_name"
                value={this.state.activeItem.pet_name}
                onChange={this.handleChange}
                placeholder="Nombre"
              />
            </FormGroup>
            <FormGroup>
              <Label for="animal">Animal</Label>
              <Input
                type="text"
                id="vet-animal"
                name="animal"
                value={this.state.activeItem.animal}
                onChange={this.handleChange}
                placeholder="Perro/Gato/Pinguino"
              />
            </FormGroup>
              
            <FormGroup>
              <Label for="pet_age">Edad de tu mascota</Label>
              <Input
                type="number"
                id="vet-pet_age"
                name="pet_age"
                value={this.state.activeItem.pet_age}
                onChange={this.handleChange}
                placeholder="Edad"
              />
            </FormGroup>

            <FormGroup>
              <Label for="pet_medical_history">Historial Medico</Label>
              <Input
                type="text"
                id="vet-pet_medical_history"
                name="pet_medical_history"
                value={this.state.activeItem.pet_medical_history}
                onChange={this.handleChange}
                placeholder="Historial Medico"
              />
            </FormGroup>

   
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Guardar cambios
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}