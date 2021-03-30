import React, { Component } from 'react';
import axios from '../../../axios-orders'
import { Redirect } from 'react-router';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            status: '',
            redirect: false,
        }
    }


    componentDidMount() {
        axios.get('/AdminPortal/ViewAttendenceSheet/attendence_getById.php?id=' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    status: response.data.status,
                })
            })
            .catch(error => console.log(error));
    }

    onChangeUsername(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }
   

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            name: this.state.name,
            time: this.state.time,
            date: this.state.date,
            status: this.state.status,
        };

        axios.post('/AdminPortal/ViewAttendenceSheet/attendence_update.php?id=' + this.props.match.params.id, obj)
            .then(this.setState({ redirect: true }));
    }


    render() {

        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/viewattendenceadmin/" />
        }

        return (
            <div className="container">
            <div className="container" style={{ marginTop: 10 }}>
                <h3>Edit Attendence</h3><br />
                <form>
                    <div className="form-group col-md-6">
                        <label for="exampleInputname">Username</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Username"
                            value={this.state.name}
                            onChange={this.onChangeUsername} />
                    </div>
                    
                    <div className="form-group col-md-6">
                        <label for="exampleInputname">Status</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Enter Present/Absent"
                            value={this.state.status}
                            onChange={this.onChangeStatus} />
                    </div>
                    <div className="form-group col-md-2">
                        <button type="submit" class="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
};

export default Edit;