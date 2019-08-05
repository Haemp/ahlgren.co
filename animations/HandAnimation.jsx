import React from 'react';
import './animations.css';

import PropTypes from 'prop-types';
import handSvg from './../hand.svg';
import AnimationHelper from './AnimationHelper';

const ENTER_TIMING = 500;
const EXIT_TIMING = 400;
const WAVE_TIMING = 1000;

const fadeInAnimation = {
    translateY: ['-20%', 0],
    opacity: [0, 1],
    elasticity: 0,
    duration: 500
};

const fadeOutAnimation = {
    translateY: [0, '-20%'],
    opacity: [1, 0],
    duration: 1000
};

const waveAnimation = {
    rotate: ['0deg', '20deg', '-25deg', '5deg', '0deg'],
    duration: 1000,
    easing: 'easeInOutQuad',
    elasticity: 0
};

const style = {
    transformOrigin: '90% 95%'
}

export default class HandAnimation extends React.Component{
    render(){
        return (
            <img src={handSvg}
                 style={style} 
                 ref={ref => this.wavingHand = ref}
                 className="ah-hand-animation ah-animations--hidden" />
        )
    }

    componentDidMount(){
        this._setStateFromNewProps(this.props);
    }

    componentWillReceiveProps(props){
        if(props.playState != this.props.playState)
            this._setStateFromNewProps(props);
    }

    _setStateFromNewProps(props){
        if(!props.playState) return;
        
        let promise;
        switch(props.playState){
            case 'hidden':
                promise = this.exit()
            break;

            case 'visible':
                promise = this.start()
            break;

            case 'wave':
                promise = this.wave();
            break;
        }

        promise.then(_ => {
            if(this.props.onAnimationComplete)
                this.props.onAnimationComplete()
        })
    }

    start(){
        return AnimationHelper.animatePromise(this.wavingHand, fadeInAnimation);
    }

    wave(){
        return AnimationHelper.animatePromise(this.wavingHand, waveAnimation);
    }

    exit(){
        return AnimationHelper.animatePromise(this.wavingHand, fadeOutAnimation);
    }
}

HandAnimation.propTypes = {
    playState: PropTypes.oneOf(['hidden', 'visible', 'wave'])
}