import React, {Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Home from '@material-ui/icons/Home';
import Explore from '@material-ui/icons/Explore';
import Info from '@material-ui/icons/Info';
import ContactSupport from '@material-ui/icons/ContactSupport';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';

// Import Admin Dashboard Comp
import Dashboard from './components/admin/dashboard';
import Header from './components/admin/header/header';
import ShowCase from './components/admin/showcase/showcase';
import About from './components/admin/about/about';
import Ourteam from './components/admin/ourteam/ourteam';
import ExploreComp from './components/admin/explore/explore.comp';
import Pages from './components/admin/pages/pages';

import './App.css';




const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }


    return (
      <BrowserRouter>

      
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                NKW Touch Screen Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
                <ListItem button className={classes.nested}> 
                    <ListItemIcon><RemoveRedEye/></ListItemIcon>
                    <ListItemText primary='View Site' />
                </ListItem>
                <ListItem button className={classes.nested}>
                    <Link to="/admin/header" >
                        <ListItemIcon><Home/></ListItemIcon>
                    </Link> 
                    <Link to="/admin/header" >
                         <ListItemText primary='Header' />
                    </Link> 

                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to="/admin/showcase">
                    <ListItemIcon><Explore/></ListItemIcon>
                  </Link>
                  <Link to="/admin/showcase">
                    <ListItemText primary='ShowCase' />
                  </Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemIcon><Info/></ListItemIcon>
                    <ListItemText primary='About' />
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemIcon><Info/></ListItemIcon>
                    <ListItemText primary='Explore' />
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemIcon><ContactSupport/></ListItemIcon>
                    <ListItemText primary='Contact' />
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemIcon><PhotoLibrary/></ListItemIcon>
                    <ListItemText primary='Library' />
                </ListItem>
          </List>
        
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
             <Fragment>
                <Switch>
                   <Route    exact path='/admin'    component={Dashboard} />
                   <Route    path='/admin/header'   component={Header} />
                   <Route    path='/admin/showcase' component={ShowCase} />
                   <Route    path='/admin/about'    component={About} />
                   <Route    path='/admin/ourteam'  component={Ourteam} /> 
                   <Route    path='/admin/explore'  component={ExploreComp} />
                   <Route    path='/admin/pages' component={Pages} /> 
                </Switch>
             </Fragment>
          
        </main>
      </div>
      </BrowserRouter>
  );
}

export default App;
