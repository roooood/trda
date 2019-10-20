import React from 'react';
import autoBind from 'react-autobind';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import Context from '../library/Context';
import Themes from "./themes";
import Route from './Route';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import Footer from './Footer';

class index extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);
    }
    render() {
        return (
            <ThemeProvider theme={Themes.default}>
                <div style={styles.root}>
                    <CssBaseline />
                    <Appbar />
                    <Sidebar />
                    <main style={styles.content}>
                        <div style={styles.appBarSpacer} />
                        <Container maxWidth="lg" style={styles.container}>
                            <Grid container spacing={3}>
                                <Route />
                            </Grid>
                        </Container>
                        <Footer />
                    </main>
                </div>
            </ThemeProvider>
        );
    }
}


let theme = createMuiTheme()
const styles = {
    root: {
        display: 'flex',
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
};
export default index;