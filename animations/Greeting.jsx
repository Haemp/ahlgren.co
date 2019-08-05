import React from 'react';
import ReactDOM from 'react-dom';
import Vivus from 'Vivus';
import PropTypes from 'prop-types';

import AnimationHelper from './AnimationHelper';

import greetingSvg from '../images/hello-cursive.svg';

import './greeting.css';
import './animations.css';

const liftAnimation = {
    translateY: [0, '-30%'],
    duration: 1000
}

const fadeInAnimation = {
    translateY: ['-20%', 0],
    opacity: [0, 1],
    duration: 1000
};

const fadeOutAnimation = {
    translateY: ['-100%'],
    opacity: [1, 0],
    elasticity: 0,
    duration: 2000
};

export default class Greeting extends React.Component{
    render(){
        return (
            <div id="greeting" ref={ref => this.greeting = ref} className="animate-fading"></div>           
        )
    }

    lift(){
        return AnimationHelper.animatePromise(this.greeting, liftAnimation);
    }

    fadeIn(){
        return AnimationHelper.animatePromise(this.greeting, fadeInAnimation);
    }

    fadeOut(){
        return AnimationHelper.animatePromise(this.greeting, fadeOutAnimation);
    }

    write(){
        return new Promise(fulfill => {
            this._vivus.setFrameProgress(0.6)
            this._vivus.play(() => {
                fulfill();
            })
        });
    }

    componentWillReceiveProps(newProps){
        if(newProps.playState != this.props.playState)
            this._updateAnimations(newProps);
    }

    _updateAnimations(props){
        let promise;

        if(!props.playState) return;
        switch(props.playState){
            case 'visible':
                promise = this.fadeIn();
            break;

            case 'write':
                promise = this.write();
            break;

            case 'lift':
                promise = this.lift();
            break;

            case 'hidden':
                promise = this.fadeOut();
            break;
        }

        promise.then(_ => {
            if(this.props.onAnimationComplete)
                this.props.onAnimationComplete();
        })
    }
    
    componentDidMount(){
        this._vivus = new Vivus('greeting', {
            duration: 500, 
            file: greetingSvg,
            type: 'oneByOne',
            start: 'manual',
            animTimingFunction: Vivus.LINEAR,
            onReady: () => {

                if(this.props.onReady)
                    this.props.onReady();
            }
        });

        if(this.props.playState)
            this._updateAnimations(this.props);
    }
}
Greeting.propTypes = {
    playState: PropTypes.oneOf(['visible', 'hidden', 'write', 'lift']),
    onReady: PropTypes.func
}