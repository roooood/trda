import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

class Route extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);

    }
    render() {
        return (
            null
        );
    }
}

export default connect(state => state)(Route);