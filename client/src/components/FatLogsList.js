import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getFatLogs, deleteFatLog } from "../actions/fatLogActions";
import { loadUser } from "../actions/authActions";
import PropTypes from "prop-types";
import store from "../store";

class FatLogsList extends Component {
  static propTypes = {
    getFatLogs: PropTypes.func.isRequired,
    fatLog: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getFatLogs(this.props.username);
    //this.putUserIntoState();
    console.log(this.props.username);
  }

  /*putUserIntoState = () => {
    let promise = new Promise(resolve => resolve(store.dispatch(loadUser())));
    promise.then(this.props.getFatLogs(store.getState().auth.user));
  };*/

  onDeleteClick = (id, user) => {
    console.log(id);
    this.props.deleteFatLog(id, user);
  };

  render() {
    const { user } = this.props.auth;
    const { fatLogs } = this.props.fatLog;
    return (
      <Container>
        {/*user ? user.name : null */}
        <ListGroup>
          <TransitionGroup className="fatLogs-list">
            {fatLogs.map(
              ({ _id, username, food, unit, quantity, fat, date, meal }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {this.props.isAuthenticated ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id, username)}
                      >
                        &times;
                      </Button>
                    ) : null}
                    <Form>
                      <FormGroup>
                        <Label for="fatLog">Username</Label>
                        <Input type="text" value={username} readOnly />
                      </FormGroup>
                      <FormGroup>
                        <Label for="fatLog">Food</Label>
                        <Input type="text" value={food} readOnly />
                      </FormGroup>
                      <FormGroup>
                        <Label for="fatLog">Unit</Label>
                        <Input type="text" value={unit} readOnly />
                      </FormGroup>
                      <FormGroup>
                        <Label for="fatLog">Quantity</Label>
                        <Input type="text" value={quantity} readOnly />
                      </FormGroup>
                      <FormGroup>
                        <Label for="fatLog">Fat Content In Grams</Label>
                        <Input type="number" value={fat} readOnly />
                      </FormGroup>
                      <FormGroup>
                        <Label for="fatLog">Date</Label>
                        <Input type="text" value={date} readOnly />
                      </FormGroup>
                      <FormGroup>
                        <Label for="fatLog">Meal</Label>
                        <Input type="text" value={meal} readOnly />
                      </FormGroup>
                    </Form>
                  </ListGroupItem>
                </CSSTransition>
              )
            )}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { getFatLogs, deleteFatLog, loadUser })(
  FatLogsList
);
