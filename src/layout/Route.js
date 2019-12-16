import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Switch, Route, Redirect } from 'react-router-dom';
import Context from 'library/Context';
import Dashboard from 'route/dashboard/Dashboard';
import UserManage from 'route/user/UserManage';
import MarketManage from 'route/market/MarketManage';
import TokenManage from 'route/token/TokenManage';
import OrderManage from 'route/order/OrderManage';
import VideoManage from 'route/video/VideoManage';
import Setting from 'route/setting/Env';
import Admin from 'route/setting/Admin';
import Chat from 'route/chat/Chat';
import Login from 'route/sign/Login';
import Method from 'route/payment/Method';
import Deposit from 'route/payment/Deposit';
import Withdraw from 'route/payment/Withdraw';



class MyRouter extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        autoBind(this);

    }
    componentDidMount() {
        if (this.props.user.isLogin) {
            this.connectToServer();
            this.context.game.register('welcome', this.connected);
        }
    }
    connectToServer() {
        if (!this.context.game.isConnect) {
            this.context.game.connect(
                () => {
                    this.context.game.getAvailableRooms((rooms) => {
                        if (rooms.length > 0) {
                            this.context.game.join(rooms[0].roomId, { key: 'admin' });
                        }
                        else {
                            this.context.game.join('trade', { create: true, key: 'admin' });
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
    render() {
        if (!this.props.user.isLogin)
            return (<Login />)
        if (this.state.loading)
            return (
                <div style={styles.root} >
                    <CircularProgress />
                </div>
            )
        return (
            <Switch>
                <Route path="/" exact component={Dashboard} onEnter={this.requireAuth} />
                <Route path="/user/manage" component={UserManage} />
                <Route path="/market/manage" component={MarketManage} />
                <Route path="/token/manage" component={TokenManage} />
                <Route path="/order/manage" component={OrderManage} />
                <Route path="/video/manage" component={VideoManage} />
                <Route path="/setting/env" component={Setting} />
                <Route path="/setting/admin" component={Admin} />
                <Route path="/payment/method" component={Method} />
                <Route path="/payment/deposit" component={Deposit} />
                <Route path="/payment/withdraw" component={Withdraw} />
                <Route path="/support" component={Chat} />
            </Switch>
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
        marginTop: '10%'
    }
}
export default connect(state => state)(MyRouter);