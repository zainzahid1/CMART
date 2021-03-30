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
        axios.get('/UserPortal/delete.php?id=' + this.props.obj.id)
            .then(this.setState({ redirect: true }))
            .catch(error => console.log(error));
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/view" />
        }

        return (

            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                <Avatar className="avatar" name={this.props.obj.username}
                size="42" round={true} /> {this.props.obj.username}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.props.obj.password}
                </td>
                <td className="actions">
                    <Link to={"/edit/" + this.props.obj.id} class="edit " title="Edit" data-toggle="tooltip" href><i class="material-icons">&#xE254;</i></Link>
                    <a class="delete " title="Delete" data-toggle="tooltip" href onClick={this.delete}><i class="material-icons">&#xE872;</i></a>
                </td>
            </tr>

        );
    }
}

export default RecordsList;