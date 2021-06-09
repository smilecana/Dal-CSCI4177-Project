import React from 'react';

export default function Dashboard(props) {
    return (
        <div>
            <label>E-mail: </label>
            <span>Hi:) {props.userInfo.email}</span>
        </div>
    );
}