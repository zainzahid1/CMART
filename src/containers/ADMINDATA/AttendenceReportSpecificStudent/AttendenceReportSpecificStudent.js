import React, { Component } from 'react';
import axios from '../../../axios-orders'
import Avatar from 'react-avatar';
import classes from './ViewAttendence.module.css'
/* import DatePicker from 'react-datepicker';
import {Form} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css"; */
import 'date-fns'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'


class AttendenceReportSpecificStudent extends Component {
    constructor(props) {
        super(props);
        this.onChangeId = this.onChangeId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            fromDate: new Date(),
            toDate: new Date(),
            error: false,
            students: [],
        }
    }

    handleDateChange = (date) => {
        this.setState({ fromDate: date })
    }
    handleDateChange2 = (date) => {
        this.setState({ toDate: date })
    }

    onChangeId(e) {
        this.setState({ id: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id: this.state.id,
            fromDate: this.state.fromDate.toLocaleDateString(),
            toDate: this.state.toDate.toLocaleDateString(),
        };

        axios.post('/AdminPortal/ViewSpecificStudentAttendence/specific_student_attendence_list.php', obj)
            .then((response) => {
                let backdata = response.data;
                let obj ;
                backdata.map((object) => {
                  return obj=object.userID
                })
                if(obj === this.state.id){
                    this.setState({ students: response.data })
                    this.setState({ error: false })
                }
                else{
                    this.setState({ error: true })

                }
               

            })

    }

    render() {
        let ErrorMessage = null;
        if (this.state.error) {
            ErrorMessage = <p style={{
                color: "red", fontSize: "22px",
            }}>Record not found!</p>
        }
        return (
            <div className="container">
                <div className="container" style={{ marginTop: 10 }}>
                    <h3>Attendence Report</h3><br />
                    <br />
                    <br />
                    <form>
                        <div className="form-group col-md-2">
                            <label for="exampleInputname">User-ID</label>
                            <input type="text"

                                className="form-control"
                                placeholder="Id"
                                value={this.state.id}
                                onChange={this.onChangeId}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label for="exampleInputname">From Date</label>
                            <br />
                            {/*  <DatePicker
                                className="form-control"
                                value={this.state.fromDate}
                                selected={this.state.fromDate}
                                dateFormat="MM/dd/yyyy"
                                onChange={date => this.setState({ fromDate: date })}
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                            /> */}

                            <MuiPickersUtilsProvider
                                utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        variant="dialog"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        value={this.state.fromDate}
                                        onChange={this.handleDateChange}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                        </div>
                        <div className="form-group col-md-2">
                            <label for="exampleInputname">To Date</label>
                            <br />
                            {/*   <DatePicker
                                className="form-control"
                                value={this.state.toDate}
                                selected={this.state.toDate}
                                dateFormat="MM/dd/yyyy"
                                onChange={date => this.setState({ toDate: date })}
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                            /> */}
                            <MuiPickersUtilsProvider
                                utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        variant="dialog"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        value={this.state.toDate}
                                        onChange={this.handleDateChange2}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                    </form>
                </div>
                <div style={{ marginLeft: 30 }}>
                    <button type="submit" class="btn btn-success" onClick={this.onSubmit}>Generate Report</button>
                </div>
                <div className="container ">

                    <h2 align="center"
                        style={{ fontFamily: "'Comfortaa', cursive", fontWeight: "bolder", marginTop: 30 }}>
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
                            {this.state.students.map((object) => {
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
                    <div class="container" className={classes.notFound} >{ErrorMessage}</div>
                </div>
            </div>


        );
    }
}

export default AttendenceReportSpecificStudent;