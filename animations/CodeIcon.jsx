import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

import AnimationHelper from './AnimationHelper';

import './animations.css'
import './code-icon.css'

const LEAVE_ANIMATION = Symbol();
const FLOAT_ANIMATION = Symbol();
const ENTER_ANIMATION = Symbol();
const TOP_LEFT_ANIMATION = Symbol();
const TOP_RIGHT_ANIMATION = Symbol();
const TOP_CENTER_ANIMATION = Symbol();
const animations = new Map();

animations.set(ENTER_ANIMATION, {
    opacity: [0, 1],
    translateY: ['-100%', 0],
    scale: [0, 1],
    duration: 2000,
})

const leaveAnimationMove = {
    translateX: 0,
    translateY: 0,
    scale: 1,
    duration: 3000
};

const leaveAnimationImage = {
    opacity: 0,
    elasticity: 0,
    duration: 3000
};

animations.set('left', {
    translateX: [0, '-100%'],
    translateY: [0, '-100%'],
    scale: [1, 0.3],
    duration: 1000,
})

animations.set('rise', {
    translateY: ['0%', '-50%'],
    duration: 3000,
})

animations.set('center', {
    ...animations.get('left'), 
    translateX: [0, 0]
})

animations.set('right', {
    ...animations.get('left'), 
    translateX: [0, '100%']
})

animations.set(FLOAT_ANIMATION, {
    translateY: ['-10%', '10%'],
    duration: 1000,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    elasticity: 0,
    loop:true
})


export default class CodeIcon extends React.Component{

    componentDidMount(){
        this.float();
    }

    componentWillReceiveProps(newProps){
        if(newProps.playState !== this.props.playState)
            this._setAnimationProps(newProps);
    }

    _setAnimationProps(props){

        if(!props.playState) return;

        let promise;

        switch(props.playState){
            case 'hidden':
                promise = this.leave()
            break;

            case 'rise':
                promise = this.rise();
            break;
                
            case 'showing':
                promise = this.enter();
            break;

            case 'minimized':
                promise = this.minimize();
            break;
        }

        promise.then(_ => {
            if(this.props.onAnimationComplete){
                this.props.onAnimationComplete();
            }
        })
    }

    enter(){
        return AnimationHelper.animatePromise(this.iconImg, animations.get(ENTER_ANIMATION))
    }

    float(){
        return AnimationHelper.animatePromise(this.floatContainer, animations.get(FLOAT_ANIMATION))
    }

    rise(){
        return AnimationHelper.animatePromise(this.moveContainer, animations.get('rise'));
    }

    minimize(){
        return AnimationHelper.animatePromise(this.moveContainer, animations.get(this.props.position));
    }

    leave(){
        return Promise.all([
            AnimationHelper.animatePromise(this.moveContainer, leaveAnimationMove),
            AnimationHelper.animatePromise(this.iconImg, leaveAnimationImage)
        ]);
    }

    render(){
        return (
            <div className="ah-code-icon">
                <div className="ah-code-icon--float-container" ref={ref => this.floatContainer = ref}>
                    <div className="ah-code-icon--move-container" ref={ref => this.moveContainer = ref}>
                        <img className="ah-code-icon--enter-container" ref={ref => this.iconImg = ref} src={this.props.icon} />
                    </div>
                </div>
            </div>
        )
    }
}

CodeIcon.propTypes = {
    playState: PropTypes.oneOf([
        'hidden', 'showing', 'minimized', 'rise'
    ]),
    position: PropTypes.oneOf([
        'left', 'center', 'right'
    ]).isRequired,
    icon: PropTypes.string.isRequired,
}