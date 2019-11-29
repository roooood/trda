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

import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import ChatIcon from '@material-ui/icons/ChatBubbleOutline';
import VideocamIcon from '@material-ui/icons/OndemandVideo';



const ListItems = [
  {
    text: t('Dashboard'),
    icon: DashboardRoundedIcon,
    link: '/'
  },
  {
    text: t('Users'),
    icon: PeopleAltRoundedIcon,
    sub: [
      {
        text: t('usersManage'),
        icon: SettingsIcon,
        link: '/user/manage'
      }
    ]
  },
  {
    text: t('Market'),
    icon: ShoppingBasketIcon,
    sub: [
      {
        text: t('marketManage'),
        icon: SettingsIcon,
        link: '/market/manage'
      }
    ]
  },
  {
    text: t('Orders'),
    icon: TrendingUpRoundedIcon,
    sub: [
      {
        text: t('orderManage'),
        icon: SettingsIcon,
        link: '/order/manage'
      }
    ]
  },
  {
    text: t('Token'),
    icon: ListRoundedIcon,
    sub: [
      {
        text: t('tokenManage'),
        icon: SettingsIcon,
        link: '/token/manage'
      }
    ]
  },
  {
    text: t('Video'),
    icon: VideocamIcon,
    sub: [
      {
        text: t('videoManage'),
        icon: SettingsIcon,
        link: '/video/manage'
      }
    ]
  },
  {
    text: t('Setting'),
    icon: SettingsIcon,
    link: '/setting'
  },
  {
    text: t('Messages'),
    icon: ChatIcon,
    link: '/support'
  }
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
    for (let i in this.state.open) {
      this.state.open[i] = false;
    }
    this.setState(state => (state.open[i] = !(state.open[i] || false), state))
  }
  loadMain() {
    return (
      ListItems.map((item, i) => {
        return (
          <>
            {('link' in item)
              ? <>
                <Link to={item.link} key={i}>
                  <ListItem button onClick={() => this.handleClick(i)}>
                    <ListItemIcon>
                      {(this.context.state.menuState && this.state.open[i]) ? <ExpandMore /> : <item.icon />}
                    </ListItemIcon>
                    <ListItemText primary={item.text} style={styles.subItem} />
                  </ListItem>
                </Link>
              </>
              : <ListItem button onClick={() => this.handleClick(i)} >
                <ListItemIcon>
                  {(this.context.state.menuState && this.state.open[i]) ? <ExpandMore /> : <item.icon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {('sub' in item) ? this.state.open[i] ? <ExpandLess /> : <ExpandMore /> : null}
              </ListItem>
            }
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
        <List style={{ width: !this.context.state.menuState ? drawerWidth : drawerMinWidth, overflow: 'hidden' }}>
          {this.loadMain()}
        </List>
      </Drawer>
    )
  }
}

const drawerWidth = 220;
const drawerMinWidth = 55;
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
