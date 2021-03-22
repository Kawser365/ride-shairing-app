import React   from 'react';
import {Link} from 'react-router-dom';
const Transport = (props) => {
    const {name,image} = props.vehicle;
    return (
      
           <div className="col-md-3">
               <div className="card">
                   <img src={image} style={{width: '100px'}} class="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <Link to={`/destination/${name}`}> <button className="btn btn-primary">Go Destination</button> </Link>
                </div>
                </div>
           </div>
   
    );
};

export default Transport;