import React from 'react';
import ReactDOM from 'react-dom';
import Typist from 'react-typist';
import AnimationHelper from './AnimationHelper';
import './animations.css';
import './animated-text.css';

const fadeOutAnimation = {
  translateY: [0, '-20%'],
  opacity: [1, 0],
  elasticity: 0,
  duration: 1000
};

export default class AnimatedText extends React.Component{

  constructor(){
    super();

    this.state = {};
  }

  componentDidMount(){
    this._updateAnimationState(this.props)
  }

  componentWillReceiveProps(newProps){
    if(newProps.playState != this.props.playState){
      this._updateAnimationState(newProps);
    }
  }

  fadeOut(){
    return AnimationHelper.animatePromise(this.text, fadeOutAnimation);
  }

  _updateAnimationState(props){

    if(!props.playState) return;
    let promise;

    switch(props.playState){
      case 'write':
        this.setState({isStarted: true})
        promise = new Promise(fulfill => this.writePromiseFulfill = fulfill);
      break;
      
      case 'hidden':
        promise = this.fadeOut();
      break;
    }

    promise.then(_ => {
      if(this.props.onAnimationComplete){
        this.props.onAnimationComplete();
      }
    })
  }

  onTypingDone(){
    setTimeout(this.writePromiseFulfill, this.props.delay || 1000);
  }

  render(){
    return (
      <div className="ah-animated-text" ref={ref => this.text = ref}>
        {this.state.isStarted &&
          <Typist cursor={{show: false}} onTypingDone={_ => this.onTypingDone()}>
            {this.props.children}
          </Typist>
        }
      </div>
    );
  }
}
  
