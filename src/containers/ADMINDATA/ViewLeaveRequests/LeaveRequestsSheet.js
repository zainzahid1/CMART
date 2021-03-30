import React, {useState,useEffect  } from 'react';

import axios from '../../../axios-orders'
import RecordsList from './LeaveRequestsRecordList';

const View = props => { 
  

  const[LeaveRequests,setLeaveRequests] = useState([]);

  

  useEffect(() => {
    axios.post('/AdminPortal/ViewLeaveSheet/leave_sheet.php')
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => console.log(error));
  },[]);

 const leaveList = ()=> {
    return LeaveRequests.map((object, i) => {
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
          Leave Sheet</h2>
           
        <table className="customers" style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Message</th>
              <th scope="col">UserID</th>

            </tr>
          </thead>
          <tbody>
            {leaveList()}
          </tbody>
        </table>
      </div>
    );
  };


export default View;