import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './image.css';

function getLever(){
    let fulfill;
    const p = new Promise(fulfillPromise => {
        fulfill = fulfillPromise
    })
    p.fulfill = fulfill;
    return p;
}


export default class Image extends React.Component {

    static propTypes = {
        maxSize: PropTypes.object,
        effect: PropTypes.string,
        src: PropTypes.string.isRequired,
        backgroundCSS: PropTypes.object
    }


    render(){
        // @inspect
        const style = {
            backgroundImage: `url(${this.props.src})`,
            backgroundPosition: 'center center',
            backgroundSize: this.props.size || 'cover'
        };
        const classes = ['ah-image--img'];

        if(this.props.size === 'none'){
            style.backgroundSize = '';
        }

        if(this.props.effect === 'zoom'){
            classes.push(['ah-image__zooming']);
        }

        return <div className="ah-image" style={this.props.backgroundCSS}>
            <div className={classes.join(' ')} style={style}></div>
        </div>
    }
}