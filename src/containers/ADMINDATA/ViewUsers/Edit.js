import React, { Component } from 'react';
import axios from '../../../axios-orders'
import { Redirect } from 'react-router';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            email: '',
            password: '',
            redirect: false,
        }
    }


    componentDidMount() {
        axios.get('/UserPortal/getById.php?id=' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    email: response.data.email,
                    password: response.data.password,


                })
            })
            .catch(error => console.log(error));
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

        axios.post('/UserPortal/update.php?id=' + this.props.match.params.id, obj)
            .then(this.setState({ redirect: true }));
    }


    render() {

        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/view/" />
        }

        return (
            <div className="container" style={{ marginTop: 10 }}>
                <h3>Edit User</h3><br />
                <form>
                    <div className="form-group">
                        <label for="exampleInputname">Username</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.onChangeEmail} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputText1">Password</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChangePassword} />
                    </div>

                    <button type="submit" class="btn btn-primary" onClick={this.onSubmit}>Update</button>
                </form>
            </div>
        );
    }
};

export default Edit;