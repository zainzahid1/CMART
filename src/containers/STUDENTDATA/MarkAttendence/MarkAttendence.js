import React, { Component } from 'react';
import axios from '../../../axios-orders'
import Moment from 'moment';

class MarkAttendence extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

        this.state = {
            id: localStorage.getItem('Id'),
            name: localStorage.getItem('data'),
            date: Moment(new Date()).format('MM/dd/yyyy'),
            time: Moment().format('h:mm:ss a'),
            markedError: false,
            alreadyMarked: false,
            noError: false,
        }
    }



    componentDidMount() {

        axios.get('/UserPortal/MarkAttendence/already_marked.php?id=' + this.state.id)
            .then((response) => {
                let backdata = response.data;
                let obj, obj1;
                backdata.map((object) => {
                    return obj = object.date
                })
                backdata.map((object) => {
                    return obj1 = object.offTime
                })
                if (obj1 === '') {
                    this.setState({ noError: false, markedError: true, alreadyMarked: false })
                }

                else {
                    if (obj === this.state.date) {
                        this.setState({ noError: false, markedError: false, alreadyMarked: true })
                    }
                    else {
                        this.setState({ noError: true, markedError: false, alreadyMarked: false })
                    }
                }
            })


    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id: this.state.id,
            name: this.state.name,
            date: this.state.date,
            time: this.state.time
        };
        axios.post('/UserPortal/MarkAttendence/insert_attendence.php', obj)
            .then(
                this.setState({ markedError: true, alreadyMarked: false, noError: false }),
            )

    }

    onUpdate(e) {
        e.preventDefault();
        const obj = {
            id: this.state.id,
            name: this.state.name,
            date: this.state.date,
            time: this.state.time
        };
        axios.post('/UserPortal/MarkAttendence/update_list.php', obj)
            .then(
                this.setState({ markedError: false, alreadyMarked: true, noError: false }),
            )
    }









    render() {

        return (
            <div className="container">
                <div className="container" style={{ marginTop: 10 }}>
                    <h3>Mark Attendence</h3><br />
                    <br />
                    <br /><br /><br />
                    <form>
                        {/*   <div className="form-group col-md-1">
                            <label for="exampleInputname">User-ID</label>
                            <input type="text"
                            id="disabledInput"
                                className="form-control"
                                placeholder="Id"
                                value={this.state.id}
                                disabled
                                 />
                        </div>
                        <div className="form-group col-md-5">
                            <label for="exampleInputname">Username</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Username"
                                value={this.state.name}
                                disabled
                                />
                        </div> */}
                        {/*  <div className="form-group col-md-3">
                            <label for="exampleInputname">Date</label>
                            <br />
                            <DatePicker
                                className="form-control"
                                selected={this.state.selectDate}
                                onChange={date => this.setState({ selectDate: date})}
                                maxDate={new Date()}
                                minDate={new Date()}
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                            />
                        </div> */}
                        {/*   <div className="form-group col-md-3">
                            <label for="exampleInputname">Time</label>
                            <br />
                            <TimePicker
                                value={this.state.selectTime}
                                onChange={time => this.setState({ selectTime: time})}
                            />
                        </div> */}
                        {/*  <div className="form-group col-md-11">
                            <label for="exampleInputname">Status</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter Present/Absent"
                                value={this.state.status}
                                onChange={this.onChangeStatus} />
                        </div> */}

                        {/*     <div className="form-group col-md-2">
                        {this.state.markedError ?  <button type="submit" class="btn btn-danger" onClick={this.onDelete}>Checkout</button>
                        : null }
                        {this.state.alreadyMarked ?  <button type="submit" class="btn btn-sucess" disabled >Today attendance is already marked</button>
                        : null }
                        {this.state.noError ?  <button type="submit" class="btn btn-success"  onClick={this.onSubmit}>Checkin</button> 
                        : null }
                        </div> */}



                        <div className="form-group col-md-2">
                            {this.state.markedError ? <button type="submit" class="btn btn-danger" onClick={this.onUpdate}>Check Out</button>
                                : null}
                            {this.state.noError ? <button type="submit" class="btn btn-success" onClick={this.onSubmit}>Check In</button>
                                : null}
                            {this.state.alreadyMarked ? <button type="submit" class="btn btn-sucess" disabled style={{ backgroundColor: "red", color: "white", fontSize: "20px" }} >Today's attendance is already marked</button>
                                : null}
                        </div>

                    </form>

                </div>
            </div>
        );
    }
}

export default MarkAttendence;