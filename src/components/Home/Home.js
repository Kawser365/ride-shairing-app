import React, { useEffect, useState } from 'react';
import transportInfo from '../../Data/Data.json'
import './Home.css';
import Transport from '../Transport/Transport';
const Home = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        setData(transportInfo)
    },[])
    console.log(data)
    return (
       <div className="body">
           
        <div className="container">
            <div className="row">
          {
              data.map(vehicle => <Transport vehicle={vehicle}></Transport> )
          }
            </div>
        </div>
       </div>
       
      
    );
};

export default Home;