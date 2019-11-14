import React from 'react';
import autoBind from 'react-autobind';
import { Link } from "react-router-dom";
import Context from 'library/Context';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { t } from 'locales';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';



const ListItems = [
  {
    text: t('users'),
    icon: PersonRoundedIcon,
    link: '/'
  },
  {
    text: t('users'),
    icon: PersonRoundedIcon,
    sub: [
      {
        text: t('usersManage'),
        icon: PeopleAltRoundedIcon,
        link: '/user/manage'
      }
    ]
  },
  {
    text: t('market'),
    icon: PersonRoundedIcon,
    sub: [
      {
        text: t('marketManage'),
        icon: ShoppingBasketIcon,
        link: '/market/manage'
      }
    ]
  },
  {
    text: t('trade'),
    icon: PersonRoundedIcon,
    sub: [
      {
        text: t('orderManage'),
        icon: ShoppingBasketIcon,
        link: '/order/manage'
      }
    ]
  },
  {
    text: t('token'),
    icon: PersonRoundedIcon,
    sub: [
      {
        text: t('tokenManage'),
        icon: ShoppingBasketIcon,
        link: '/token/manage'
      }
    ]
  },
]

class Sidebar extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      open: []
    };
    autoBind(this);
  }
  handleClick(i) {
    this.setState(state => (state.open[i] = !(state.open[i] || false), state))
  }
  loadMain() {
    return (
      ListItems.map((item, i) => {
        return (
          <>
            <ListItem key={i} button onClick={() => this.handleClick(i)}>
              <ListItemIcon>
                {(this.context.state.menuState && this.state.open[i]) ? <ExpandMore /> : <item.icon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {('sub' in item) ? this.state.open[i] ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItem>
            {
              ('sub' in item) &&
              <Collapse style={!this.context.state.menuState ? styles.subs : {}} in={this.state.open[i]} timeout="auto" unmountOnExit>
                {
                  item.sub.map((subItem, j) => {
                    return (
                      <Link to={subItem.link} key={i + '' + j}>
                        <ListItem style={styles.subItem} button>
                          <ListItemIcon>
                            <subItem.icon />
                          </ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItem>
                      </Link>
                    )
                  })
                }
              </Collapse>
            }
          </>
        )
      })
    )
  }
  render() {
    return (
      <Drawer
        variant="permanent"
        style={this.context.state.menuState ? styles.drawerPaperClose : styles.drawerPaper}
        open={this.context.state.menuState}
      >
        <div style={styles.toolbarIcon}>
        </div>
        <List style={{ width: !this.context.state.menuState ? drawerWidth : drawerMinWidth }}>
          {this.loadMain()}
        </List>
      </Drawer>
    )
  }
}

const drawerWidth = 240;
const drawerMinWidth = 72;
let theme = createMuiTheme()
const styles = {
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 4,
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  subs: {
    marginRight: 15,
    marginLeft: 15,
  },
  subItem: {
    borderRadius: 5,
    color: 'rgba(0, 0, 0, 0.54)',
    testDecoration: 'none'
  }
}

export default Sidebar;
