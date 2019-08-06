import React, { Component } from 'react';
const timeline = require('./timeline.svg');

class Timeline extends Component {
    render() {
        return (
            <div {...this.props}>
                <img src={timeline} />
            </div>
        );
    }
}

export default Timeline;
