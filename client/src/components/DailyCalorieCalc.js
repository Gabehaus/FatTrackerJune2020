import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import Graphs2 from "./Graphs2";
import Graphs3 from "./Graphs3";
import Graphs4 from "./Graphs4";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import FatLogsList from "./FatLogsList";
import FatLogModal from "./FatLogModal";

class Components extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""} </strong>
          </span>
        </NavItem>
        <NavLink tag={RRNavLink} exact to="/graphs" activeClassName="active">
          My Graphs
        </NavLink>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    const MyFatLogsList = props => {
      return <FatLogsList username={user.name} />;
    };

    return (
      <BrowserRouter>
        <div>
          <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
              <NavbarBrand href="/">Fat Consumption Logs</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {isAuthenticated ? authLinks : guestLinks}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <Container>
            <Route exact path="/" component={FatLogModal} />
            {user ? <Route exact path="/" render={MyFatLogsList} /> : null}
          </Container>
          <Route exact path="/graphs" component={Graphs2} />
          <Route exact path="/graphs" component={Graphs3} />
          <Route exact path="/graphs" component={Graphs4} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Components);
