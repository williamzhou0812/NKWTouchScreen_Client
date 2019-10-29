import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import { Button } from  '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Container from  '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

import './showcase.scss';
import VideoAddFormModal from './modals/videoAdd';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        textAlign: 'center',
        right: theme.spacing(2),
    },
    input: {
        margin: theme.spacing(1),
        width: '90%',
    },
  }));

const ShowCase = () => {

    const classes = useStyles();

    const [showCaseMap, setShowCaseMap ]= useState([{
        title: '',
        video: '',
        poster_img: '',
        sliders: '',
        bannerImg:''
    }]);

    const [showCase, setShowCase] = useState({
        title: '',
        video: '',
        poster_img: '',
        sliders: '',
        bannerImg:''
    });
    const [showCaseOne, setShowCaseOne] = useState({
        title: '',
        video: '',
        poster_img: '',
        sliders: '',
        bannerImg:''
    });


   



    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [_id, setId] = useState('');



    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
      };
    

    

        
        useEffect(() => {
            axios.get('/api/showcase').then(res => {
                console.log(res.data);
                setShowCaseMap(res.data);
                // setId(res.data[0]._id);
            })
        }, [])

        
        
        
        const handleSave = () => {
            axios.post(`/api/showcase`, showCase).then(res => {
                setShowCaseMap([...showCaseMap, res.data]);
                console.log(res.data)
            });
            setShowCase({
                title: '',
                video: '',
                poster_img: '',
                sliders: '',
                bannerImg:''
            });
            setOpen(false);
            // console.log(showCase);
        }
        
        const onhandleDelete = (id) => { 
           // console.log(`${id}`);
            axios.delete(`http://localhost:5000/api/showcase/${id}`).then(res => {
                setShowCaseMap(res.data)
            });
        }
        

        const onhandleEdit  = (id) => { 
            setOpenEdit(true);
            setId(id);
            axios.get(`/api/showcase/${id}`).then(res => {
                console.log(res.data);
                setShowCaseOne(res.data);
                // setId(res.data[0]._id);
            })
            console.log('handel Edit modal id'+id)

        }
     
        const handleUpdateEdit = (id) => {
            axios.put(`/api/showcase/${id}`, showCaseOne).then(res => {
                setShowCaseMap(res.data)
            });
            setOpenEdit(false);
               // console.log(id);
        }

       
        const onChange = e => {
            
            setShowCase({
                ...showCase,
                [e.target.name]: e.target.value
                
            });
    
        };

               
        const onChangeEdit = e => {
            
            setShowCaseOne({
                ...showCaseOne,
                [e.target.name]: e.target.value
                
            });
    
        };




    return (

        <Fragment>
            <h1> SHOW CASE </h1>
            
            <Container fixed>
                {  (showCaseMap.length > 0 )?  (
                    <h3>Your Contents List </h3>  
                    ) : (
                    <h3> 
                        Your Contents List is Empty!!!
                    </h3>
                    )
                }
                    
                <List className={classes.root}>
                        {showCaseMap.map(showcase => {
                               return (
                                <div>
                                <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Poster Image for NKW ShowCase video" src={showcase.poster_img} />
                                </ListItemAvatar>
                                <ListItemText
                                primary={showcase.title}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                         {''}
                                    </Typography>
                                    </React.Fragment>
                                }
                                />
                                      <Button variant="contained" color="primary" className={classes.button}  onClick={() => onhandleEdit(showcase._id)}>
                                        Edit
                                        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                        <Edit className={classes.rightIcon} />
                                    </Button>
                                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => onhandleDelete(showcase._id)}>
                                         Delete
                                    <DeleteIcon className={classes.rightIcon} />
                                </Button>
    
                             </ListItem>
                             <Divider variant="inset" component="li" />
                             </div>
                              )
                        })}
                       
                </List>
                       

                    <Grid item xs={12}>
                            <Fab aria-label="Add" className={classes.fab} color="secondary"  onClick={handleClickOpen}>
                                <AddIcon />
                            </Fab>
                    </Grid>

                    <Dialog  fullWidth="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">ADD or Uploade your Video</DialogTitle>
                    <DialogContent>
                    <Input
                        placeholder="Video Title"
                        name="title"
                        value={showCase.title}
                        onChange={onChange}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                    <Input
                        placeholder="Video URI: http://www.video.com"
                        name="video"
                        value={showCase.video}
                        onChange={onChange}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                    <Input
                        placeholder="Poster Image"
                        name="poster_img"
                        value={showCase.poster_img}
                        onChange={onChange}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                    <Input
                        placeholder="Image Slider"
                        name="sliders"
                        value={showCase.sliders}
                        onChange={onChange}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                    <Input
                        placeholder="Banner Image"
                        name="bannerImg"
                        value={showCase.bannerImg}
                        onChange={onChange}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button  onClick={handleSave} color="primary">
                        Save
                    </Button>
                    </DialogActions>
                </Dialog>


               {/* { Edit Dialog} */}
               <Dialog  fullWidth="lg" open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit ShowCase</DialogTitle>
                    <DialogContent>
                    <Input
                        placeholder="Video Title"
                        name="title"
                        value={showCaseOne.title}
                        onChange={onChangeEdit}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                    <Input
                        placeholder="Video URI: http://www.video.com"
                        name="video"
                        value={showCaseOne.video}
                        onChange={onChangeEdit}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                    <Input
                        placeholder="Poster Image"
                        name="poster_img"
                        value={showCaseOne.poster_img}
                        onChange={onChange}
                        onChange={onChangeEdit}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                    <Input
                        placeholder="Image Slider"
                        name="sliders"
                        value={showCaseOne.sliders}
                        onChange={onChangeEdit}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                    <Input
                        placeholder="Banner Image"
                        name="bannerImg"
                        value={showCaseOne.bannerImg}
                        onChange={onChangeEdit}
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                    />
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Cancel
                    </Button>
                    <Button   onClick={() => handleUpdateEdit(_id)} color="primary">
                        Update
                    </Button>
                    </DialogActions>
                </Dialog>
           
                            
            </Container>

          
        </Fragment>


    )

}

export default ShowCase;

