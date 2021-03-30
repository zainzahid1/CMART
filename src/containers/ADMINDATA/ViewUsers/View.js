import React, {useState,useEffect  } from 'react';

import axios from '../../../axios-orders'
import RecordsList from './RecordsList';

const View = props => { 
  

  const[students,setStudents] = useState([]);

  

  useEffect(() => {
    axios.post('/UserPortal/list.php')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => console.log(error));
  },[]);

 const usersList = ()=> {
    return students.map((object, i) => {
      return <RecordsList obj={object} key={i}/>;
    });
  }

  /*    componentDidMount(){
  firebase.child("SignUpData").on("value",snapshot =>{
    if(snapshot.val()!=null)
    this.setState({students: {...snapshot.val()}})
  })
 }
 
 usersList(){
   return Object.keys(this.state.students).map(data =>{
       return <RecordsList obj={this.state.students[data]}  />;
   });
 } */

  
    return (
      <div className="container ">

        <h2 align="center"
          style={{ fontFamily: "'Comfortaa', cursive", fontWeight: "bolder", marginTop:30}}>
          Users List</h2>
           
        <table className="customers" style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th scope="col">UserID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            {usersList()}
          </tbody>
        </table>
      </div>
    );
  };


export default View;