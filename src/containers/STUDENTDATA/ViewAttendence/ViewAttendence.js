import React, {useState,useEffect  } from 'react';

import axios from '../../../axios-orders';
import Avatar from 'react-avatar';
import classes from './ViewAttendence.module.css'

const ViewAttendence = props => { 
  
  const[students,setStudents] = useState([]);
  const[error,setError] = useState(false);
  const[matchId] = useState(localStorage.getItem('Id'));

  useEffect(() => {
    axios.get('/UserPortal/MarkAttendence/attendence_list.php?id=' + matchId)
      
      .then((response) => {
        let backdata = response.data;
        let obj ;
        backdata.map((object) => {
          return obj=object.userID
        })
        console.log('backdata',backdata);
        console.log('matchid',matchId);
        if (obj === matchId) {
          setStudents(backdata);
          setError(false);
        }
        else {
          setError(true); 
        }
      })
     
  },[matchId]);

  let ErrorMessage = null;
  if (error) {
    ErrorMessage = <p style={{ color: "red", fontSize: "22px",
      }}>Record not found!</p>
  }

    return (
      <div className="container ">

        <h2 align="center"
          style={{ fontFamily: "'Comfortaa', cursive", fontWeight: "bolder", marginTop:30}}>
          Attendence Sheet</h2>
           
        <table className="customers" style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th scope="col">UserID</th>
              <th scope="col">Username</th>
              <th scope="col">In Time</th>
              <th scope="col">Off Time</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>

            </tr>
          </thead>
          <tbody>
         {students.map((object) => {
             return <tr>
                <td>
                    {object.userID}
                </td>
                <td>
                <Avatar className="avatar" name={object.name}
                size="42" round={true} /> {object.name}
                </td>
                <td>
                    {object.inTime}
                </td>
                <td>
                    {object.offTime}
                </td>
                <td>
                    {object.date}
                </td>
                <td >
                    {object.status}
                </td>
            </tr>
         })}
          </tbody>
        </table>
        <div class="container" className={classes.notFound} >{ ErrorMessage}</div>
      </div>
    );
  };


export default ViewAttendence;