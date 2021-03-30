import React from 'react';

function Profile(props) {
    return (
        <div className="container">
            <h1>Name : {localStorage.getItem('data')}</h1>
        </div>
    );
}

export default Profile;