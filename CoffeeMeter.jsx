import Icon from './icons/Icons';
import React from 'react';

import './coffee-meter.css';

export default (props) => {
    // inspect 
    const cups = [];
    for(var i = props.rank; i > 0; i--){
        cups.push(<Icon.Coffee key={i} />)
    }

    // @mock cups  
    return <div className="ah-coffee-meter">
        <label>{props.label}</label>
        <div className="ah-coffee-meter--cup-container">
            {cups}
        </div>
    </div>
}