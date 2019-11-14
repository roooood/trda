import React from 'react';
import autoBind from 'react-autobind';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        autoBind(this);
    }
    render() {
        return (
            <Grid item xs={12}>
                <Paper style={styles.root}>
                    Dashboard
                </Paper>
            </Grid>
        );
    }
}

const styles = {

}
export default Dashboard;