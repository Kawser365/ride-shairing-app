import React,{useState,useEffect} from 'react';
import './Destination.css'
import Image from'./image/Map.png';
import people from'./image/peopleicon.png';
import transportInfo from '../../Data/Data.json'
import {useParams} from 'react-router-dom';
const Destination = () => {
    const {name} = useParams();
    console.log(name)
    const [details, setDetails] = useState([]);
    useEffect(() => {
       setDetails(transportInfo)
    }, [])

    
   
    let [show, setShow] = useState(false)
    const result =  details.filter(detail=> detail.name == name)
    const info = result.map(rider => rider.image)
    const handleSubmit = (e) => {
        setShow(true)
        e.preventDefault()
    } 

   

    
    return (
        <div className="detail">
            <div className="row">
                <div className="col-md-6">
                {
                    !show && (
                            <div className="row">
                            <form onSubmit={handleSubmit}  className="form-container">
               <div className="form-group">
                    <label for="exampleForEmail">Pick From</label>
                    <input type="text" className="form-control" name="" required/>
                </div>
                <div className="form-group">
                    <label for="exampleForPassword">Pick To</label>
                    <input type="text" className="form-control" name="" required/>
                </div>
                <button type="submit"  className="btn btn-primary">Search</button>
               </form>
                        </div>
                    )
                }
               {
                   show && (
                       <div className="form-container">
                           <h3>Mirpur 1</h3>
                           <h3>To</h3>
                            <h3>Dhanmondi</h3>
                        <div>
                       <div className="row">
                           <div className="col-md-3">
                           <img style={{width: '40px'}} src={info} alt=""/>
                           </div>
                           <div className="col-md-3">
                           <img style={{width: '40px'}} src={people} alt=""/>
                           </div>
                           <div className="col-md-3">
                           <h5>$15</h5>
                           </div>
                       </div>
                        </div>
                        <div>
                        <div className="row">
                           <div className="col-md-3">
                           <img style={{width: '40px'}} src={info} alt=""/>
                           </div>
                           <div className="col-md-3">
                           <img style={{width: '40px'}} src={people} alt=""/>
                           </div>
                           <div className="col-md-3">
                           <h5>$15</h5>
                           </div>
                       </div>
                        </div>
                        <div>
                        <div className="row">
                           <div className="col-md-3">
                           <img style={{width: '40px'}} src={info} alt=""/>
                           </div>
                           <div className="col-md-3">
                           <img style={{width: '40px'}} src={people} alt=""/>
                           </div>
                           <div className="col-md-3">
                           <h5>$15</h5>
                           </div>
                       </div>
                        </div>        
                       </div>
                   )
               }
               </div>
               
               <div className="col-md-6">
                   <img src={Image} style={{width:'300px'}} alt=""/>
               </div>
               </div>
               </div>
          
    );
};

export default Destination;