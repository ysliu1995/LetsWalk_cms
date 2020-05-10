import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';

import UserList from './UserList'
import TeamList from './TeamList'
import TeamInfo from './TeamInfo'
import Notification from './Notification'

import { HashRouter, Route, Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#37ABA2",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));



export default function ClippedDrawer() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
    <HashRouter>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            LetsWalk CMS
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
            {/* <ListItem
                button
                selected={selectedIndex === 0}
                onClick={event => handleListItemClick(event, 0)}
                component={Link} to={'/'}
            >
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText>使用者列表</ListItemText>
            </ListItem>
            <Divider/> */}
            <ListItem
                button
                selected={selectedIndex === 1}
                onClick={event => handleListItemClick(event, 1)}
                component={Link} to={'/teamlist'}
            >
              <ListItemIcon><PeopleIcon/></ListItemIcon>
              <ListItemText>組隊列表</ListItemText>
            </ListItem>
            <Divider/>
            {/* <ListItem
                button
                selected={selectedIndex === 2}
                onClick={event => handleListItemClick(event, 2)}
                component={Link} to={'/notification'}
            >
              <ListItemIcon><SendIcon/></ListItemIcon>
              <ListItemText>發送通知</ListItemText>
            </ListItem> */}
            <Divider/>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
            
            <div>
                <Route exact path="/" component={ TeamList } />
                <Route path="/teamlist" component={ TeamList } />
                <Route path="/teaminfo" component={ TeamInfo } />
                <Route path="/notification" component={ Notification } />
            </div>
            
      </main>
    </HashRouter>  
    </div>
  );
}
