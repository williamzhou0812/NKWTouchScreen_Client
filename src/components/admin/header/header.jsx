import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import './header.scss';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const Header = () => {
   
    const [header, setHeader] = useState({
      logo_img: '',
      nav_one: '',
      nav_two: '',
      nav_three: ''

  });

  const [_id, setId] = useState('');
 
 
useEffect(() => {
  axios.get('/api/header').then(res => {
    setHeader(res.data[0]);
    console.log(res.data[0])
    setId(res.data[0]._id)
  })
}, []);

const {logo_img, nav_one, nav_two, nav_three} = header;

const onChange = e => {
  setHeader({...header, [e.target.name]: e.target.value});

}

const onSubmit = e => { 
  e.preventDefault();
  axios.put(`/api/header/${_id}`, header).then(res => {
    console.log(res.data)
  });

  setHeader({...header, [e.target.name]: e.target.value});
  
}

  return (
    <Fragment>
            <div>
            
                 <h1>Header Section</h1>

                 <form onSubmit={onSubmit}> 
                   <div>

                      <h2>Header Logo</h2>
                      <input 
                          type='text' 
                          placeholder='Header Image  Logo URL'
                          name="logo_img"
                          value={logo_img}
                          onChange={onChange} />
                   </div>
                   <div>
                      <h2> Main Nav Bar </h2>

                      <input type='text'
                             placeholder='Main Navbar Left' 
                             name="nav_one" 
                             value={nav_one}
                             onChange={onChange} />

                      <input type='text' 
                             placeholder='Main Navbar Middle'
                             name="nav_two"
                             value={nav_two}
                             onChange={onChange} />

                      <input type='text' 
                             placeholder='Main Navbar Right' 
                             name="nav_three"
                             value={nav_three}
                             onChange={onChange}/>
                   </div>
                   <Button  variant="contained" color="secondary"  type="submit" >Save/Update</Button>
                 </form> 
                
            </div>
            <Divider /> 
            <h1>PRE_VIEW</h1>
            <div>
              <img src={logo_img}  style={{height: '25vh', width: '30vw'}} /> 
              <div>{Date()}</div>
                <ul className="nav"> 
                  <li>
                    {nav_one}
                  </li>
                  <li>
                    {nav_two}
                  </li>
                  <li>
                    {nav_three}
                  </li>
                </ul>
            </div>
           

    </Fragment>
  );
}

export default Header;
