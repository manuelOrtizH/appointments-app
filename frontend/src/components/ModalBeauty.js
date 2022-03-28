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

export default class CustomModalBeauty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };
//   style_type = models.CharField(max_length=20)
//   hair_type = models.CharField(max_length=20)
//   hair_treatment = models.CharField(max_length=20)
  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Veterinaria: Estetica Tepis</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="style_type">Tipo de Estilo</Label>
              <Input
                type="text"
                id="style_type"
                name="style_type"
                value={this.state.activeItem.style_type}
                onChange={this.handleChange}
                placeholder="Tipo de Estilo"
              />
            </FormGroup>
            <FormGroup>
              <Label for="hair_type">Tipo de Pelo</Label>
              <Input
                type="text"
                id="hair_type"
                name="hair_type"
                value={this.state.activeItem.hair_type}
                onChange={this.handleChange}
                placeholder="Tipo de Pelo"
              />
            </FormGroup>
            <FormGroup>
              <Label for="hair_treatment">Tratamiento de Pelo</Label>
              <Input
                type="text"
                id="hair_treatment"
                name="hair_treatment"
                value={this.state.activeItem.hair_treatment}
                onChange={this.handleChange}
                placeholder="Tratamiento"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}