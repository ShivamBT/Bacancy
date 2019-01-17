
import React, { Component } from 'react';
import Forms from './Parent';

class Body extends Component {
    render() {
        return (
            <div className="body">
                <div>
                    <Forms/>
                </div>
            </div>
        );
    }
}

export default Body;
