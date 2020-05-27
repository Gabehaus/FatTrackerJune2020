import React, { Component } from "react";
import CalculatorModal from "./auth/CalculatorModal";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import {
  addFatLog,
  changeCalcFood,
  changeCalcUnit,
  changeCalcQuantity,
  changeCalcFat
} from "../actions/fatLogActions";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class FatLogModal extends Component {
  state = {
    modal: false,
    name: "",
    date: new Date(),
    meal: "Breakfast",
    nestedModal: false,
    closeAll: false,
    fat: this.props.fatLog.calcFat,
    food: this.props.fatLog.calcFood,
    unit: this.props.fatLog.calcUnit,
    quantity: this.props.fatLog.calcQuantity
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeCalcFood = e => {
    this.props.changeCalcFood(e.target.value);
    this.setState({ food: this.props.fatLog.calcFood });
  };

  changeCalcQuantity = e => {
    this.props.changeCalcQuantity(e.target.value);
    this.setState({ quantity: this.props.fatLog.calcQuantity });
  };

  changeCalcUnit = e => {
    this.props.changeCalcUnit(e.target.value);
    this.setState({ unit: this.props.fatLog.calcUnit });
  };

  changeCalcFat = e => {
    this.props.changeCalcFat(e.target.value);
    this.setState({ fat: this.props.fatLog.calcFat });
  };

  onChangeDate = date => {
    this.setState({
      date: date
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const newFatLog = {
      username: this.props.user.name,
      food: this.props.fatLog.calcFood,
      unit: this.props.fatLog.calcUnit,
      quantity: this.props.fatLog.calcQuantity,
      fat: this.props.fatLog.calcFat,
      date: this.state.date,
      meal: this.state.meal
    };

    // Add item via addItem action
    this.props.addFatLog(newFatLog);
    // Close modal
    this.props.fatLog.newLogAdded && this.toggle();
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Fat Log
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage fat logs</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add To Fat Consumption Logs
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <Label for="fatLog">Food</Label>
                <Input
                  type="text"
                  name="food"
                  value={this.props.fatLog.calcFood}
                  id="food"
                  placeholder="Enter name of food"
                  onChange={this.changeCalcFood}
                />
              </FormGroup>
              <FormGroup>
                <Label for="fatLog">Unit</Label>
                <Input
                  type="select"
                  name="unit"
                  value={this.props.fatLog.calcUnit}
                  id="unit"
                  placeholder="Enter unit of measurement"
                  onChange={this.changeCalcUnit}
                >
                  <option>whole</option>
                  <option>serving</option>
                  <option>package</option>
                  <option>bag</option>
                  <option>box</option>
                  <option>kg</option>
                  <option>lb</option>
                  <option>ounce</option>
                  <option>fluid ounce</option>
                  <option>gram</option>
                  <option>cup</option>
                  <option>quart</option>
                  <option>handfull</option>
                  <option>can</option>
                  <option>bottle</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="fatLog">Quantity</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={this.props.fatLog.calcQuantity}
                  id="quantity"
                  placeholder="Enter number of units consumed"
                  onChange={this.changeCalcQuantity}
                />
              </FormGroup>
              <FormGroup>
                <Label for="fatLog">Meal</Label>
                <Input
                  type="select"
                  name="meal"
                  id="exampleSelect"
                  onChange={this.onChange}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                  <option>Random Meal</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="fat">Fat Content</Label>
                <Input
                  type="number"
                  step="any"
                  name="fat"
                  value={this.props.fatLog.calcFat}
                  id="fat"
                  placeholder="Fat content in grams"
                  onChange={this.changeCalcFat}
                />
              </FormGroup>
              <Button color="success" onClick={this.toggleNested}>
                Use Fat Calculator
              </Button>
              <Modal
                isOpen={this.state.nestedModal}
                toggle={this.toggleNested}
                onClosed={this.state.closeAll ? this.toggle : undefined}
              >
                <ModalHeader>Fat Content Calculator</ModalHeader>
                <ModalBody>
                  <CalculatorModal />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleNested}>
                    Done
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleAll}>
                    All Done
                  </Button>
                </ModalFooter>
              </Modal>
              <br />
              <br />
              <FormGroup>
                <Label>My Date Picker</Label>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Log
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  addFatLog,
  changeCalcFood,
  changeCalcQuantity,
  changeCalcUnit,
  changeCalcFat
})(FatLogModal);
