import React from 'react';
import './cropper.css';


export default (props) => {
    const classes = ["ah-cropper"];
    const {
        fillWidth, 
        fillHeight, 
        src, 
        panning, 
        noStretch,
        zooming
    } = props;

    let fill = false;
    let minWidth = '100%';
    let minHeight = '100%';

    if(fillWidth || fillHeight){
        minWidth = minHeight = '';
    }

    if(panning && !fill){
        classes.push("ah-cropper__panning")
    }

    if(zooming){
        classes.push("ah-cropper__zooming")
    }

    if(noStretch){
        minWidth = minHeight = '';
    }

    return <div className={classes.join(' ')}>
        <img src={props.src} style={{
            flexShrink: 0,
            minWidth,
            backgroundColor: props.backgroundColor,
            minHeight,
            maxWidth: 900,
            width: props.fillWidth ? '100%' : '',
            height: props.fillHeight ? '100%' : ''
        }} />
    </div>
}