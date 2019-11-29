import React from 'react';
import autoBind from 'react-autobind';
import './assets/css/app.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import GameServer from './library/Game';
import Finnhub from './library/Finnhub';
import Context from './library/Context';

import Layout from './layout'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < 1000,
      menuState: false,
      loading: true
    };
    this.game = new GameServer('trade');
    this.finnhub = new Finnhub();
    autoBind(this);
  }
  changeState(obj) {
    this.setState(obj)
  }
  componentDidMount() {
    this.connectToServer();
    this.game.register('welcome', this.connected);
  }
  connectToServer() {
    if (!this.game.isConnect) {
      this.game.connect(
        () => {
          this.game.getAvailableRooms((rooms) => {
            if (rooms.length > 0) {
              this.game.join(rooms[0].roomId, { key: 'admin' });
            }
            else {
              this.game.join('trade', { create: true, key: 'admin' });
            }
          });
        },
        () => setTimeout(() => { this.connectToServer() }, 5000)
      );
    }
  }
  connected(data) {
    this.setState({ loading: false });
    // this.live.connect(() => {
    //   this.setState({ loading: false });
    // });
  }
  app(obj) {
    return this[obj];
  }
  renderLoading() {
    return null;
  }
  render() {
    if (this.state.loading) {
      return (
        <div style={styles.root} >
          <CircularProgress />
        </div>
      )

    }
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

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }
}
export default App;