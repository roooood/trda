import React from 'react';
import autoBind from 'react-autobind';
import './assets/css/app.css'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import GameServer from './library/Game';
import Finnhub from './library/Finnhub';
import Context from './library/Context';

import Snack from './component/Snack';
import Layout from './layout'

let EventEmitter = require('events')
window.ee = new EventEmitter();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < 1000,
      menuState: false,
    };
    this.game = new GameServer('trade');
    this.finnhub = new Finnhub();
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
            <Snack />
            {/* <Modal ref={r => this.modal = r} /> */}
            <Layout />
          </Context.Provider>
        </PersistGate>
      </Provider >
    );
  }
}


export default App;