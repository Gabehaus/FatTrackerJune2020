import React, { Component } from "react";
import Components from "./components/Components";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import FatLogsList from "./components/FatLogsList";
import FatLogModal from "./components/FatLogModal";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Components />
        </div>
      </Provider>
    );
  }
}

export default App;
