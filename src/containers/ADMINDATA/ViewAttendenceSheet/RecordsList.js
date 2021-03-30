import React, { Component } from 'react';
import axios from '../../../axios-orders'
import { Redirect, Link } from 'react-router-dom';
import Avatar from 'react-avatar';



class RecordsList extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

        this.state = {
            redirect: false
        }
    }

    delete() {
        axios.get('/AdminPortal/ViewAttendenceSheet/attendence_delete.php?id=' + this.props.obj.id)
            .then(this.setState({ redirect: true }))
            .catch(error => console.log(error));
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/viewattendenceadmin" />
        }

        return (

            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                <Avatar className="avatar" name={this.props.obj.name}
                size="42" round={true} /> {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.inTime}
                </td>
                <td>
                    {this.props.obj.offTime}
                </td>
                <td>
                    {this.props.obj.date}
                </td>
                <td>
                    {this.props.obj.status}
                </td>
                <td>
                    {this.props.obj.userID}
                </td>
                <td className="actions">
                    <Link to={"/editattendenceadmin/" + this.props.obj.id} class="edit " title="Edit" data-toggle="tooltip" href><i class="material-icons">&#xE254;</i></Link>
                    <a class="delete " title="Delete" data-toggle="tooltip" href onClick={this.delete}><i class="material-icons">&#xE872;</i></a>
                </td>
            </tr>

        );
    }
}

export default RecordsList;