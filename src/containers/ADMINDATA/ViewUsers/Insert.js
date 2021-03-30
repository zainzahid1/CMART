import React, { Component } from 'react';
import axios from '../../../axios-orders'

class Insert extends Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            redirect: false,
        }
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };


        axios.post('/UserPortal/insert.php', obj)
            .then(response => console.log(response.data))


        this.setState({
            username: '',
            email: '',
            password: '',

        })
    }


    render() {



        return (
            <div className="container" style={{ marginTop: 10 }}>
                <h3>Add New User</h3><br />
                <form>
                    <div className="form-group col-md-8">
                        <label for="exampleInputname">Username</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.onChangeUsername} />
                    </div><br/>
                    <div className="form-group col-md-8">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.onChangeEmail} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group col-md-8">
                        <label for="exampleInputText1">Password</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group col-md-6">
                            <button type="submit" class="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                        </div>
                    </form>
            </div>
        );
    }
};

export default Insert;