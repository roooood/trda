import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Dashboard from 'route/dashboard/Dashboard';
import UserManage from 'route/user/UserManage';
import MarketManage from 'route/market/MarketManage';

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
            </Switch>
        );
    }
}

export default connect(state => state)(MyRouter);