import React, { Component } from 'react';
import Avatar from 'react-avatar';



class RecordsList extends Component {


    render() {
      
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
                    {this.props.obj.leave_request}
                </td>
                <td>
                    {this.props.obj.userID}
                </td>
               
            </tr>

        );
    }
}

export default RecordsList;