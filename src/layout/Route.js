import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UserManage from '../route/user/UserManage';

class MyRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);

    }
    render() {
        return (
            <Router>
                {/* <Route path="/" exact component={Home} /> */}
                <Route path="/user/manage" component={UserManage} />
            </Router>
        );
    }
}

export default connect(state => state)(MyRouter);