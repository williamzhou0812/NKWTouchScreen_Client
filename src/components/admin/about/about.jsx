import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Button } from  '@material-ui/core';
import Divider from '@material-ui/core/Divider';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  




// const onChange = e => {
//        console.log(e.target.name)
//        console.log(e.target.value)

    

//    };

const About = () => {
  
  // init About  State 
  const [about, setAbout] = useState({
      about_header_section: {
        main_title_img: '',
        main_title: '',
        sub_title: '',
        nav_a: '',
        nav_b: '',
        nav_c: '',
        nav_d: '',
        short_intro: ''
  
      },
      service_details_info: {
        sdi_a: {
          img_logo_s_a: '',
          name_s_a: '',
          des_s_a: ''
        },
        sdi_b: {
          img_logo_s_b: '',
          name_s_b: '',
          des_s_b: ''
        },
        sdi_c: {
          img_logo_s_c: '',
          name_s_c: '',
          des_s_c: ''
        },
        sdi_d: {
          img_logo_s_d: '',
          name_s_d: '',
          des_s_d:''

        }

      },
      about_who_we_are: {
        img_one: '',
        img_two: '',
        title:'',
        p_a: '',
        p_b:'',
        p_c: '',
      },
      about_mission_vision_value: {
        mission: {
          mission_name: '',
          mission_des: ''
        },
        vision: { 
          vision_name:'',
          vision_des: ''
        },
        values: {
          values_name: '',
          values_des: ''
        }

      },
      ceo_message: {
        ceo_title: '',
        ceo_p_a: '',
        ceo_p_b: '',
        ceo_p_c: '',
        ceo_p_d: ''

      }



  });

//  axios my get api 
// set Id 
const [_id, setId] = useState('');

const getAboutDate = async () => {
  const aboutData = await axios.get('/api/about');
  setAbout(aboutData.data[0]);
  setId(aboutData.data[0]._id);
  console.log(aboutData.data[0]);
}


 //get  Data from api
useEffect(() => { 
    getAboutDate();
 }, [])

  
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    function handleChange(event, newValue) {
      setValue(newValue);
    }



    /// destructer about datas

    // const [main_title] = about.about_header_section;



    // Two Way bind form data onChagne 
    const onChangeAbout = e => {
      // console.log(e.target.name);
      // console.log(e.target.value)
      setAbout({
        ...about,
        about_header_section: {
          ...about.about_header_section,
          [e.target.name]: e.target.value
        },
        service_details_info: {
          sdi_a: { 
            ...about.service_details_info.sdi_a,
            [e.target.name]: [e.target.value]
          },
          sdi_b:{
            ...about.service_details_info.sdi_b,
            [e.target.name]: [e.target.value]
          },
          sdi_c: { 
            ...about.service_details_info.sdi_c,
            [e.target.name]: [e.target.value]
          },
          sdi_d: { 
            ...about.service_details_info.sdi_d,
            [e.target.name]: [e.target.value]
          }
        },
        about_who_we_are: {
          ...about.about_who_we_are,
          [e.target.name]:[e.target.value]
        },
        about_mission_vision_value: {
          mission: { 
            ...about.about_mission_vision_value.mission,
            [e.target.name]: [e.target.value]
          },
          vision: { 
            ...about.about_mission_vision_value.vision,
            [e.target.name]: [e.target.value]
          },
          values: {
            ...about.about_mission_vision_value.values,
            [e.target.name]: [e.target.value]
          }

        },
        ceo_message: {  
          ...about.ceo_message,
          [e.target.name]:[e.target.value]
        }

       })
    };


  const onSubmit = e => {
      e.preventDefault();
      axios.put(`/api/about/${_id}`, about).then(res => {
          console.log(res.data)
      })
     //console.log(about);
  }
 
    return (
      <div className={classes.root}>
        <form onSubmit={onSubmit}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Header Section" {...a11yProps(0)} />
            <Tab label="Service Section" {...a11yProps(1)} />
            <Tab label="CEO Message Section" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
             
             <div>
                 <div> 
                    <h3>Header Background Image:</h3>
                    <input type='text' placeholder="Heaader Background Image" name="main_title_img"  value={about.about_header_section.main_title_img} onChange={onChangeAbout} />
                 </div>
                 <div>
                     <h3>Header Title</h3>
                     <input type="text" placeholder="Header Title" name="main_title"   value={about.about_header_section.main_title} onChange={onChangeAbout}  /> 
                 </div>
                 <div>
                      <h3>Sub Title</h3>
                     <input type="text" placeholder="Sub Title" name="sub_title"  value={about.about_header_section.sub_title} onChange={onChangeAbout} /> 
                 </div>
                 <div>
                     <h3>About Sub Nav Items</h3>
                        <input  type="text" placeholder="Nav Item One" name="nav_a" value={about.about_header_section.nav_a} onChange={onChangeAbout} />
                        <input  type="text" placeholder="Nav Item Two" name="nav_b" value={about.about_header_section.nav_b} onChange={onChangeAbout} /> 
                        <div>

                        <input  type="text" placeholder="Nave Item Three" name="nav_c"  value={about.about_header_section.nav_c} onChange={onChangeAbout} />
                        <input  type="text" placeholder="Nave Item Four" name="nav_d"  value={about.about_header_section.nav_d} onChange={onChangeAbout} />
                        </div>
                 </div> 
                 <div>
                     <h3>Short Describstion</h3>
                    <textarea  rows={`5`}  cols="130" placeholder="Enter Short Descripstion"  name="short_intro"  value={about.about_header_section.short_intro} onChange={onChangeAbout}/> 
                     
                 </div>
             </div>
             

            
        </TabPanel>
        <TabPanel value={value} index={1}>
                 <h1>Servcies Section</h1>
                 <div style={{margin: '5px 5px'}}>
                    <input type='text' placeholder="Logo one" name="img_logo_s_a" value={about.service_details_info.sdi_a.img_logo_s_a} onChange={onChangeAbout}/>
                    <input type='text' placeholder="Logo two" name="img_logo_s_b" value={about.service_details_info.sdi_b.img_logo_s_b} onChange={onChangeAbout}/>
                    <input type='text' placeholder="Logo three" name="img_logo_s_c" value={about.service_details_info.sdi_c.img_logo_s_c} onChange={onChangeAbout} /> 
                    <input type='text' placeholder="Logo Four" name="img_logo_s_d" value={about.service_details_info.sdi_d.img_logo_s_d} onChange={onChangeAbout}/> 
                 </div>
                 <div style={{margin: '5px 5px'}}>
                    <input type='text' placeholder="service title one" name="name_s_a" value={about.service_details_info.sdi_a.name_s_a} onChange={onChangeAbout} />
                    <input type='text' placeholder="service title two" name="name_s_b"   value={about.service_details_info.sdi_b.name_s_b} onChange={onChangeAbout} />
                    <input type='text' placeholder="service title three" name="name_s_c"  value={about.service_details_info.sdi_c.name_s_c} onChange={onChangeAbout}/> 
                    <input type='text' placeholder="service title Four" name="name_s_d"  value={about.service_details_info.sdi_d.name_s_d} onChange={onChangeAbout} /> 
                 </div>
                 <div style={{margin: '5px 5px'}}>
                    <input type='text' placeholder="short description one "  name="des_s_a"  value={about.service_details_info.sdi_a.des_s_a} onChange={onChangeAbout}  />
                    <input type='text' placeholder="short description two"   name="des_s_b"  value={about.service_details_info.sdi_b.des_s_b} onChange={onChangeAbout} />
                    <input type='text' placeholder="short description three" name="des_s_c"  value={about.service_details_info.sdi_c.des_s_c} onChange={onChangeAbout} /> 
                    <input type='text' placeholder="short description four"  name="des_s_d"  value={about.service_details_info.sdi_d.des_s_d} onChange={onChangeAbout} /> 
                 </div>

                <h1>Who are we section </h1>
                <div> 
                  <h3>Title</h3>
                  <input type='text' placeholder='Big title' name="title" value={about.about_who_we_are.title}  onChange={onChangeAbout} /> 
                </div> 
                <div>
                 <textarea  rows={`5`}  cols="50" placeholder="Frist Pargrah"  name="p_a" value={about.about_who_we_are.p_a} onChange={onChangeAbout} /> 
                 </div>
                 <div>
                 <textarea  rows={`5`}  cols="50" placeholder="Second Pargrah"  name="p_b" value={about.about_who_we_are.p_b} onChange={onChangeAbout} /> 
                 </div>
                 <div>
                 <textarea  rows={`5`}  cols="50" placeholder="Third Pargrah"  name="p_c" value={about.about_who_we_are.p_c} onChange={onChangeAbout} /> 
                </div> 
                <div> 
                  <input type='text' placeholder="url for the side image Top" name="img_one" value={about.about_who_we_are.img_one} onChange={onChangeAbout} /> 
                  <input type='text' placeholder="url for sencond side image butttom " name="img_two" value={about.about_who_we_are.img_two} onChange={onChangeAbout}/> 
                </div>
                
                <div>
                  <h1>NKW Mission, Vision & Values</h1> 

                    <div> 
                        <h3>Mission</h3>
                        <input type='text' name="mission_name" value={about.about_mission_vision_value.mission.mission_name} onChange={onChangeAbout} /><br/>
                        <textarea  rows={`5`}  cols="50"  name="mission_des" value={about.about_mission_vision_value.mission.mission_des}onChange={onChangeAbout}/> 
                    </div>
                    <div>
                    <h3>Vision</h3>
                        <input type='text' name="vision_name" value={about.about_mission_vision_value.vision.vision_name} onChange={onChangeAbout}  /> <br/>
                        <textarea  rows={`5`}  cols="50"  name="vision_des" value={about.about_mission_vision_value.vision.vision_des} onChange={onChangeAbout}  /> 
                    </div>
                    <div>
                    <h3>Values</h3>
                        <input type='text' name="values_name" value={about.about_mission_vision_value.values.values_name} onChange={onChangeAbout} /><br/>
                        <textarea  rows={`5`}  cols="50" name="values_des" value={about.about_mission_vision_value.values.values_des} onChange={onChangeAbout}   /> 
                    </div> 
                </div> 
 
        </TabPanel>
        <TabPanel value={value} index={2}>
                <h1>CEO Message Section</h1>
                <div>
                  <h3>Big Title</h3>
                  <input type='text' name="ceo_title" value={about.ceo_message.ceo_title}  onChange={onChangeAbout} /> 
                </div>
                <div>
                      <h3>pragrah A</h3>
                      <textarea  rows={`5`}  cols="50" placeholder="Paragraphs A " name="ceo_p_a" value={about.ceo_message.ceo_p_a}  onChange={onChangeAbout}/> 
                </div>
                <div>
                      <h3>pragrah B</h3>
                     <textarea  rows={`5`}  cols="50" placeholder="Paragraphs B "  name="ceo_p_b" value={about.ceo_message.ceo_p_b}  onChange={onChangeAbout}/> 
                </div>
                <div>
                    <h3>pargrah C </h3>
                    <textarea  rows={`5`}  cols="50" placeholder="Paragraphs C "  name="ceo_p_c" value={about.ceo_message.ceo_p_c}  onChange={onChangeAbout} /> 
                </div>
                <div>
                    <h3>pargrah D </h3>
                    <textarea  rows={`5`}  cols="50" placeholder="Paragraphs D"   name="ceo_p_d" value={about.ceo_message.ceo_p_d}  onChange={onChangeAbout}/> 
                </div>
        </TabPanel> 
                  <div> 

                    <Button type="submit" variant="contained" color="secondary" >Save/Update</Button>
                </div>
        </form>
   
        
      </div>
    );
}


export default About;