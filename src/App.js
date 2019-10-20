import React from 'react';
import autoBind from 'react-autobind';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import Context from './library/Context';

import Layout from './layout'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < 1000,
      menuState: false
    };
    autoBind(this);
  }
  changeState(obj) {
    this.setState(obj)
  }
  app(obj) {
    return this[obj];
  }
  renderLoading() {
    return null;
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <Context.Provider value={{ game: this.game, state: this.state, app: this.app, setState: this.changeState }}>
            {/* <Snack /> */}
            {/* <Modal ref={r => this.modal = r} /> */}
            <Layout />
          </Context.Provider>
        </PersistGate>
      </Provider >
    );
  }
}

export default App;