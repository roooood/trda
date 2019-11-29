import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Dashboard from 'route/dashboard/Dashboard';
import UserManage from 'route/user/UserManage';
import MarketManage from 'route/market/MarketManage';
import TokenManage from 'route/token/TokenManage';
import OrderManage from 'route/order/OrderManage';
import VideoManage from 'route/video/VideoManage';
import Setting from 'route/setting/Setting';
import Chat from 'route/chat/Chat';

class MyRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);

    }
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/user/manage" component={UserManage} />
                <Route path="/market/manage" component={MarketManage} />
                <Route path="/token/manage" component={TokenManage} />
                <Route path="/order/manage" component={OrderManage} />
                <Route path="/video/manage" component={VideoManage} />
                <Route path="/setting" component={Setting} />
                <Route path="/support" component={Chat} />
            </Switch>
        );
    }
}

export default connect(state => state)(MyRouter);