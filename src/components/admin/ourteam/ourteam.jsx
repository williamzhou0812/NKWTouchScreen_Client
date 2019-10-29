import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from  '@material-ui/core';


import './ourteam.scss';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));




const Ourteam = () => { 


    const classes = useStyles();



    const [ourteam, setOurteam] = useState([{
        ot_profile_img: '',
        ot_job: '',
        ot_name:'',
        ot_email: '',
        ot_phone:''
    }]);

    const [newteam, setNewteam] = useState([{
        ot_profile_img: '',
        ot_job: '',
        ot_name:'',
        ot_email: '',
        ot_phone:''
    }])
    
    const getOurteam = async () => {
        let res = await axios.get('/api/ourteam');
        setOurteam(res.data);
       // console.log(res.data);
    }


    useEffect(() => {
        getOurteam();
    }, []);



   const onChange = e => {
    //   console.log(e.target.name)
    //   console.log(e.target.value)

    setNewteam({
            ...newteam,
           [e.target.name]: e.target.value
       })

   };

    const onSubmit = e => {
        e.preventDefault();
        // console.log(e.target.name)
        // console.log(e.target.value)
        setNewteam({
            ...newteam,
           [e.target.name]: e.target.value
       })
     

        axios.post(`/api/ourteam`, newteam ).then(res => { 
            // console.log(res.data)

            setOurteam(res.data);
          
           
        });

        console.log(ourteam);
    }

    return ( 
        <Fragment>
         <div>
                <h3>Our Team Section</h3> 
                <Divider />
                <h4>Add a Team member</h4>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Averet Image" name="ot_profile_img"    value={newteam.ot_profile_img}  onChange={onChange} /><br/>
                    <input type="text" placeholder="Name" name="ot_name"   value={newteam.ot_name}  onChange={onChange} /><br/>
                    <input type="text" placeholder="Job" name="ot_job"  value={newteam.ot_job} onChange={onChange} /><br/>
                    <input type="text" placeholder="Email" name="ot_email"  value={newteam.ot_email} onChange={onChange} /><br/>
                    <input type="text" placeholder="Phone"  name="ot_phone"  value={newteam.ot_phone}  onChange={onChange} /> <br/>
                    <Button type="submit" variant="contained" color="secondary" >Add</Button>


                </form>

         </div>
            <Divider />
            

         <div>
            <List className={classes.root} >

                {  ourteam.map(ourteam => {

                    return ( 
                        <div>

                                <ListItem alignItems="flex-start" >
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={ourteam.ot_profile_img} />
                                </ListItemAvatar>
                                <ListItemText
                                primary={ourteam.ot_name}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        _{ ourteam.ot_job } 
                                    </Typography>
                                    {" "}
                                     <li> email: {ourteam.ot_email} </li>
                                     <li> phone: {ourteam.ot_phone} </li>
                                        
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                      )
                    
                    })
                    
                }
            </List>

        </div>  
   

        </Fragment>
    );
}

export default Ourteam;