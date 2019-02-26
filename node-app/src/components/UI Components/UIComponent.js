import React from 'react';
import { Badge } from 'reactstrap';

export const Badge1 = () => {
    return (
        <div >
            <h1 >
                <Badge color="primary">
                    Node Application
                </Badge>
            </h1>

        </div>
    );
}

export const Badge2 = () => {
    return (
        <Badge color="primary">
            Edit
        </Badge>
    );
}

export const Badge3 = () => {
    return (
        <div>
            <Badge color="dark">
                Edit User
            </Badge>
        </div>
    )
}

export const Badge4 = () => {
    return (
        <div>
            <Badge color="primary">
                Create User
            </Badge>
        </div>
    )
}
