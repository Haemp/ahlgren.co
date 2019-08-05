import React from 'react';
import ReactDOM from 'react-dom';
import anime from 'animejs';
import AnimationHelper from './AnimationHelper';

const Frame = _ => null;
const Transition = _ => null;


function parseTransition(transition, targets){
    let animateFunc;
    if(transition.props.animeTransition && transition.props.animeTarget){
        
        // returns a Promise
        animateFunc = () => {
            const domNodeTarget = targets.get(transition.props.animeTarget);
            return AnimationHelper.animatePromise(domNodeTarget, transition.props.animeTransition);
        }
    }else if(transition.props.animateFunc){
        animateFunc = transition.props.animateFunc;
    }else{
        throw new Error('Please specify either a anime transition or an animateFunction')
    }
    return {animateFunc};
}

function parseFrame(frame, targets){
    const transitions = React.Children.map(frame.props.children, child => parseTransition(child, targets))
    return {
        id: frame.props.id,
        transitions
    }
}

class Animator extends React.Component{

    constructor(){
        super();

        this.state = {
            paused: false
        }
    }

    componentDidMount(){

        const rootElement = ReactDOM.findDOMNode(this);
        console.log(rootElement)
        // get the animation configuration from the children
        this.targets = new Map();
        this.frames = [];
        React.Children.forEach(this.props.children, child => {
            if(child.type === Frame){
                const frame = parseFrame(child, this.targets);
                this.frames.push(frame);
            }else if(child.props['target-id']){ 
                const targetId = child.props['target-id'];
                const domNode = rootElement.querySelector('[target-id="'+ targetId +'"]');
                this.targets.set(targetId,domNode);
            }
        })

        console.log('Frames', this.frames, 'Targets: ', this.targets);
        if(this.props.start){
            this.start();
        }
    }

    componentWillReceiveProps(newProps){
        if(this.props.start != newProps.start && newProps.start){
            this.start();
        }

        if(this.props.pause != newProps.pause){
            if(newProps.pause === true){
                this.pause();
            }else{
                this.unPause();
            }
        }
    }

    pause(){
        let fulfill;
        this._unPause = new Promise(fulfillPromise => {
            fulfill = () => {
                fulfillPromise()
                this._unPause = null;
            }
        });
        this._unPause.fulfill = fulfill;

        this.setState({paused: true});
    }

    unPause(){
        if(this._unPause){
            
            // this will resolve the promise
            // and let the animation start again
            this._unPause.fulfill();
        }
    }

    async start(){

        // if the animator is paused
        
        let startPromiseFulfill;
        const startPromise = new Promise(fulfill => startPromiseFulfill = fulfill);

        for(var i = 0; i < this.frames.length; i++){
            const curFrame = this.frames[i];
            if(this.state.paused){
                await this._unPause 
            }
            
            await Promise.all(
                curFrame.transitions.map(
                    transition => transition.animateFunc()
                )
            );
        }
    }

    render(){
        return <div>
            {this.props.children}
        </div>
    }
}

export {Frame, Transition, Animator};