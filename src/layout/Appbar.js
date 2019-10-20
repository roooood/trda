import React from 'react';
import autoBind from 'react-autobind';
import Context from '../library/Context';

import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenSharpIcon from '@material-ui/icons/MenuOpenSharp';
import NotificationsIcon from '@material-ui/icons/Notifications';

class Appbar extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);
    }
    handleDrawerOpen() {
        this.context.setState({ menuState: !this.context.state.menuState });
    }
    render() {
        return (
            <AppBar position="absolute" style={styles.appBar}>
                <Toolbar style={styles.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        style={styles.menuButton}
                    >
                        {!this.context.state.menuState ? <MenuOpenSharpIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap style={styles.title}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

let theme = createMuiTheme()
const styles = {
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: 'linear-gradient(45deg, rgb(107, 139, 254) 30%, rgb(168, 83, 255) 90%)'
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },

    appBarSpacer: theme.mixins.toolbar,
}
export default Appbar;