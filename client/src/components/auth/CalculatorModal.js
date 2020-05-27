import React, { Component } from "react";
import uuid4 from "uuid4";
import { throwStatement } from "@babel/types";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { transferCalculatorResults } from "../../actions/fatLogActions";
import Image from "react-bootstrap/Image";

class fatSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      encodedSearchTerm: "",
      selected: "",
      selectedObject: {},
      selectedObjectMeasures: [],
      indexOfSelected: "",
      indexOfSelectedMeasure: "",
      selectedMeasure: "",
      typesOfFood: [],
      numberOfUnits: 1,
      uriOfSelectedMeasure: "",
      gramsFat: "",
      errored: false,
      imageAddress:
        "https://i.etsystatic.com/10919371/r/il/c45e4e/1683722024/il_570xN.1683722024_e199.jpg"
    };
    this.onChangeFood = this.onChangeFood.bind(this);
    this.onChangeMeasures = this.onChangeMeasures.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.getData = this.getData.bind(this);
  }

  onChangeSearch = e => {
    let formattedSearch = encodeURI(e.target.value);
    this.setState({ encodedSearchTerm: formattedSearch });
  };

  onChangeFood = e => {
    let indexOfSelectedVar = this.state.apiResponse.hints.findIndex(
      obj => obj.food.label == e.target.value
    );

    this.setState({
      selected: e.target.value,
      indexOfSelected: indexOfSelectedVar,
      selectedObject: this.state.apiResponse.hints[indexOfSelectedVar],
      selectedObjectMeasures: this.state.apiResponse.hints[indexOfSelectedVar]
        .measures,
      selectedFoodId: this.state.apiResponse.hints[indexOfSelectedVar].food
        .foodId,
      imageAddress: this.state.apiResponse.hints[indexOfSelectedVar].food.image
    });

    console.log(e.target.value);
    console.log(this.state.indexOfSelected);
    console.log(Array.isArray(this.state.selectedObjectMeasures));
    console.log(this.state.imageAddress);
  };

  onChangeMeasures = e => {
    let indexOfSelectedMeasure = this.state.selectedObjectMeasures.findIndex(
      obj => obj.label == e.target.value
    );

    this.setState({
      selectedMeasure: e.target.value,
      indexOfSelectedMeasure: indexOfSelectedMeasure,
      uriOfSelectedMeasure: this.state.apiResponse.hints[
        this.state.indexOfSelected
      ].measures[indexOfSelectedMeasure].uri
    });
  };

  onError = () => {
    this.setState({
      imageAddress:
        "https://i.etsystatic.com/10919371/r/il/c45e4e/1683722024/il_570xN.1683722024_e199.jpg",
      errored: true
    });
  };

  componentDidMount() {
    let test = "test";
  }

  async getData() {
    let url = `https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=${this.state.encodedSearchTerm}&app_id=e9e86788&app_key=2c231e68f3531783f0fed14057834b04`;

    let response = await fetch(url);
    let dataJSON = await response.json();

    this.setState({ apiResponse: dataJSON });
    console.log(dataJSON);
    console.log(this.state.apiResponse.hints[0]);

    this.setState({
      measure: this.state.apiResponse.hints[0].measures,
      typesOfFood: this.state.apiResponse.hints,
      selected: this.state.apiResponse.hints[0].food.label
    });

    this.setState({
      indexOfSelected: 0,
      selectedObject: dataJSON.hints[0],
      selectedObjectMeasures: dataJSON.hints[0].measures,
      selectedFoodId: dataJSON.hints[0].food.foodId,
      selectedMeasure: dataJSON.hints[0].measures[0].label,
      uriOfSelectedMeasure: dataJSON.hints[0].measures[0].uri,
      imageAddress: this.state.apiResponse.hints[0].food.image
    });
  }

  calcFat = e => {
    e.preventDefault();

    let newFatQuery = {
      ingredients: [
        {
          quantity: this.state.numberOfUnits,
          measureURI: this.state.uriOfSelectedMeasure,
          foodId: this.state.selectedFoodId
        }
      ]
    };

    let url = `https://api.edamam.com/api/food-database/nutrients?app_id=ee083348&app_key=727e64dad5d62dbe33303ed86695050d`;

    axios
      .post(url, newFatQuery)
      .then(response => {
        console.log(response);
        this.setState({
          gramsFat: +response.data.totalNutrients.FAT.quantity.toFixed(2)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  transfer = (cFood, cUnit, cQuantity, cFat) => {
    this.props.transferCalculatorResults(cFood, cUnit, cQuantity, cFat);
  };

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Enter Food Search Term: </label>
          <input
            type="string"
            className="form-control"
            onChange={this.onChangeSearch}
          />
          <button style={{ marginTop: "10px" }} onClick={this.getData}>
            Enter Search Terms
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Select Food From Search Results: </label>
            <select
              required
              className="form-control"
              value={this.state.selected}
              onChange={this.onChangeFood}
            >
              {this.state.typesOfFood.map((elem, index) => {
                return <option key={uuid4()}>{elem.food.label}</option>;
              })}
            </select>
          </div>
          <Container style={{ marginLeft: 0 }}>
            <Row>
              <Col xs={4} md={4}>
                <Image
                  src={`${this.state.imageAddress}`}
                  onError={this.onError}
                  fluid
                />
              </Col>
            </Row>
          </Container>
          <div className="form-group">
            <label>Choose Unit of Measurement: </label>
            <select
              required
              className="form-control"
              value={this.state.selectedMeasure}
              onChange={this.onChangeMeasures}
            >
              {this.state.selectedObjectMeasures.map((msr, index) => {
                return <option key={uuid4()}>{msr.label}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Enter Number of Units: </label>
            <input
              type="number"
              className="form-control"
              placeholder="number of units"
              onChange={e =>
                this.setState({ numberOfUnits: e.target.valueAsNumber })
              }
            />
          </div>
          <div className="form-group">
            <Button
              onClick={this.calcFat}
              value="Calculate Grams of Fat"
              size="md"
            >
              Calculate fat content
            </Button>
          </div>

          <Input
            value={`${this.state.gramsFat} ${
              this.state.gramsFat ? "grams" : " "
            }`}
          ></Input>
          <div className="form-group">
            <Button
              onClick={() =>
                this.transfer(
                  this.state.selected,
                  this.state.selectedMeasure,
                  this.state.numberOfUnits,
                  this.state.gramsFat
                )
              }
              size="md"
            >
              Transfer data to new log
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { transferCalculatorResults })(
  fatSearch
);
