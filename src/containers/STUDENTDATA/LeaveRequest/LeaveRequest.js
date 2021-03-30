import React, { Component } from 'react';
import axios from '../../../axios-orders'


class MarkAttendence extends Component {

    constructor(props) {
        super(props);
        this.onChangeLeaveRequest = this.onChangeLeaveRequest.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: localStorage.getItem('Id'),
            name: localStorage.getItem('data'),
            leave_request: '',
            alert: false
        }
    }


    onChangeLeaveRequest(e) {
        this.setState({
            leave_request: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const obj = {
            id: this.state.id,
            name: this.state.name,
            leave_request: this.state.leave_request
        };


        axios.post('/UserPortal/MarkAttendence/leave_request.php', obj)
            .then(this.setState({ alert: true }))

        this.setState({
            id:'',
            name: '',
            leave_request: '',
        })
    }


    render() {
        let alertMessage = null;
        if (this.state.alert) {
            alertMessage = <p className="form-group" style={{alignItems: "center", padding: "5px", display: "inline-block", color: "green", fontSize: "22px", border: "2px solid green" }}>Request Submitted!!</p>
        }

        return (
            <div className="container">
                <div className="container" style={{ marginTop: 10 }}>
                    <h3>Leave Request Form</h3><br />
                    <form>
                        <div className="form-group col-md-1">
                            <label for="exampleInputname">User-ID</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Id"
                                value={this.state.id}
                                disabled />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="exampleInputname">Username</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Username"
                                value={this.state.name}
                                disabled />
                        </div>
                        <div className="form-group col-md-12">
                            <label for="exampleInputname">Leave Request</label>
                            <br />
                            <textarea className="form-group col-md-12" name="Message" rows="12"
                                value={this.state.leave_request}
                                onChange={this.onChangeLeaveRequest} />
                        </div>
                        <div className="form-group col-md-2">
                            <button type="submit" class="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                        </div>
                    </form>
                    
                </div>
                <div>{alertMessage}</div>
            </div>
            
        );
    }
}

export default MarkAttendence;