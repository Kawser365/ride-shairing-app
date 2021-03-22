import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import {useHistory,useLocation} from 'react-router-dom'


firebase.initializeApp(firebaseConfig);

function LogIn() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,email} = res.user;
      const signedInUser = {
        isSignedInUser: true,
        name: displayName,
        email: email
 
      }
      setUser(signedInUser)
      setLoggedInUser(signedInUser)
      history.replace(from);
    })
    
  }
  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      const newUserInfo = {...user}
      newUserInfo.error = '';
      setUser(newUserInfo)
      console.log(res)
      updateUserName(user.name)
      history.replace(from);
    })
    .catch(error => {
      const newUserInfo = {...user}
      newUserInfo.error = error.message
      setUser(newUserInfo)
   });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res =>
        {const {displayName,email} = res.user;
        const signedInUser = {
          isSignedInUser: true,
          name: displayName,
          email: email
   
        }
        setUser(signedInUser)
       setLoggedInUser(signedInUser)
       history.replace(from);

      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    }
    e.preventDefault();
  }
  const handleBlur = (e) =>{
    let isFieldValid = true
    if(e.target.name === 'email'){
      const isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if(e.target.name === 'password'){
      const passwordLength = e.target.value.length > 6;
      const passwordValidate = /\d{1}/.test(e.target.value);
      isFieldValid = passwordLength && passwordValidate
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo [e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }
  const updateUserName = name => {
        const user = firebase.auth().currentUser;

          user.updateProfile({
            displayName: name,
          }).then(function() {
            console.log('updated successfully')
          }).catch(function(error) {
            console.log(error)
          });
  }
  return (
   <div>
    <section className="container-fluid">
      <section className="row justify-content-center">
        <section className="col-12 col-sm-6 col-md-3">
          <form onClick={handleSubmit} className="login-form-container">
          {newUser && <div className="form-group">
            <label for="exampleForEmail">Name</label>
            <input type="text" className="form-control" onBlur={handleBlur}  name="name" placeholder="Enter Your Name" required/>
          </div>}
          <div className="form-group">
            <label for="exampleForEmail">Email</label>
            <input type="text" className="form-control" onBlur={handleBlur}  name="email" placeholder="Enter Your Email" required/>
          </div>
          <div className="form-group">
          <label for="exampleForPassword">Password</label>
            <input type="password" className="form-control" onBlur={handleBlur}  name="password" placeholder="Enter Your password" required/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser"  className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleForPassword">Register</label>
          </div>
          <div>
          <button type="submit" className="btn btn-primary">{newUser?'Sign Up': 'Sign In'}</button>
          </div>
          </form>
          <section className="justify-content-center">
            <hr/><p>Or Sign In With</p>
          <button onClick={handleSignIn} type="submit" className="btn btn-primary">Google</button>
          </section>
        </section>
      </section>
    </section>
   </div>
  );
}

export default LogIn;
