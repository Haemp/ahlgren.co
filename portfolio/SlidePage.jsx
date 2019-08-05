import React from 'react';
import Hammer from 'hammerjs';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './slide-page.css';

const PAGE_TURN_THRESHOLD = 300;
const PAGE_STATE_NORMAL = 'normal';
const PAGE_STATE_TURNED = 'turned';

const TURNED_EVENT = 'turned';
const TURNED_BACK_EVENT = 'turnedback';
const NO_TURN_EVENT = 'noturn';

export default class SlidePage extends React.Component{
    
    constructor(){
        super()
        this.state = {
            slideDistance: 0,
            pageState: 'normal',
            isPanning: false
        }
    }

    componentDidMount(){

        // get the absolute with of the slide page
        this._size = ReactDOM.findDOMNode(this).parentElement.getBoundingClientRect();

        // add event listeners for the panning
        this._panning = new Hammer.Manager(this.slidePageEl);
        this._panning.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 20}));
        this._panning.on('panleft panright', evt => this.onPan(evt));
        this._panning.on('panend', evt => this.onPanEnd(evt));
        this._panning.on('panstart', evt => this.onPanStart(evt));
    }
    
    _objectIsEqual(o1, o2){
        return !Object.entries(o1)
                     .find(prop => o2[prop[0]] !== o1[prop[0]])
    }

    shouldComponentUpdate(newProps, newState){

        const stateChanged = !this._objectIsEqual(this.state, newState);
        if (stateChanged){
            return true; 
        } 

        if(newProps.className !== this.props.className){

            return true
        }

        return false;
    }

    _getTurnedDirection(){
        return this._size.width + this._slideDistance < PAGE_TURN_THRESHOLD ? 'left' : 'right';
    }

    /** Noop */
    fulfillRestPromise(){}

    _waitForRest(){
        return new Promise(fulfill => {
            this.fulfillRestPromise = fulfill;
        })
    }

    _initiateTurn(){
        // store slide distance in a non state variable
        // to update after every pointer event
        this._slideDistance = this.state.slideDistance;
        
        this._animationLoop();

        if(this.props.onTurnStart){
            this.props.onTurnStart();
        }
    }

    onPanStart(event){
        const {center} = event;

        // this is a fix for a bug inside HammerJS
        // causing invalid pan-start events to trigger
        const {x,y} = center;
        if(x === 0 && y === 0) return;
        
        // this is to prevent false positives when
        // vertical scrolling triggers a pan start
        console.log(event.distance, event.deltaX, event.deltaY);
        if(Math.abs(event.deltaX) >= 10){
            this.setState({isPanning: true});
            this._initiateTurn();
        }
    }

    /**
     * Triggers onTurnEnd with the current page state
     * and the direction from which it came there. 
     * 
     * If state: 'turned'
     *  -> user slides from left to right = 'turnedback'
     * 
     * If state is 'normal'
     *  -> User slides from right to left = 'turned'
     * 
     * If state is 'normal' or 'turned'
     *  -> User turns but not fully = 'noturn'
     *
     */
    onPanEnd(event){
        console.log('Pan end', event);

        // prevent false negatives
        if(event && Math.abs(event.deltaX) <= 10){
            return;
        }

        const direction = this._getTurnedDirection();
        let turnedEvent;
        let newSlideDistance = this._slideDistance;
        let newPageState = this.state.pageState;
        
        // determine rest state
        if(direction === 'left'){
            newSlideDistance = -this._size.width;
        }else{
            newSlideDistance = 0;
        }

        if(this.state.pageState === 'normal'){
            if(direction === 'left'){
                turnedEvent = TURNED_EVENT;
                newPageState = PAGE_STATE_TURNED;
            }else{
                turnedEvent = NO_TURN_EVENT;
            }
        }else if(this.state.pageState === 'turned'){
            if(direction === 'right'){
                turnedEvent = TURNED_BACK_EVENT;
                newPageState = PAGE_STATE_NORMAL;
            }else{
                turnedEvent = NO_TURN_EVENT;
            }
        }
        
        this.setState({
            isPanning: false,
            slideDistance: newSlideDistance,
            pageState: newPageState,
            isSnapping: true
        });

        if(this.props.onTurnEnd){
            this.props.onTurnEnd({
                pageState: newPageState, 
                turnedEvent
            });
        }

        this._snap(newSlideDistance).then(_ => {
            this.setState({
                isSnapping: false
            })

            this.props.onTurnEndResting && this.props.onTurnEndResting({pageState:this.state.pageState});
        })

        // this is annoying but since HammerJS triggers
        // a ghost click after the pan-end we need
        // to make sure it doesn't trigger the onClick
        // listener - which would turn back the page again
        this.isWaitingForSimulatedClick = true;
        setTimeout(_ => this.isWaitingForSimulatedClick = false, 200);
    }

    _snap(position){
        const snapTime = this.props.snapTime || 0.5;
        return new Promise(fulfill => {

            // Add animation class
            this.slidePageEl.style.transition = `transform ${snapTime}s`;
            
            // trigger the snap to end position
            this.slidePageEl.style.transform = 'translateX(' + position + 'px)';

            setTimeout(_ => {
                this.slidePageEl.style.transition = '';
                fulfill()
            }, snapTime*1000);
        })
    }

    _animationLoop(){
        requestAnimationFrame(_ => {

            if(this.state.isPanning){
                this.slidePageEl.style.transform = 'translateX(' + this._slideDistance + 'px)';
                this._animationLoop();
            }
        })
    }

    /**
     * Simply registers the new slide distance on every pointer event.
     * 
     * This is separate from every render - since to render on every
     * pointer event would cause us multiple renders per frame which slows
     * down performance.
     */
    onPan(event){

        if(event.center.x === 0 && event.center.y === 0) return;
        
        // this distance should be the same as the translation 
        // of the slide
        if(this.state.pageState === PAGE_STATE_TURNED){
            this._slideDistance = event.deltaX - this._size.width;
        }else{
            this._slideDistance = event.deltaX;
        }
        
        // determine bounds - preventing overscrolling
        if(this._slideDistance >= 0){
            this._slideDistance = 0;
        }else if(this._slideDistance <= 0 - this._size.width){
            this._slideDistance = 0 - this._size.width
        }
    }
    
    renderClassNames(){
        return `
            ah-slide-page 
            ah-slide-page__${this.state.pageState} 
            ${(this.state.isPanning || this.state.isSnapping) ? 'ah-slide-page__panning' : ''} 
            ${this.props.className} 
        `;
    }

    onRest(){
        this.fulfillRestPromise();
    }

    onClick(){
        
        if(this.isWaitingForSimulatedClick)
            return;

        if(this.props.clickTurn){
            this.state.slideDistance = this.slidePageEl.getBoundingClientRect().width * -1;
            this.state.isPanning = false;
            this._initiateTurn();
            this.onPanEnd();
        }
    }

    render(){
        const {children, name} = this.props;

        return(
            <div ref={ref => this.slidePageEl = ref} 
                 onClick={_ => this.onClick()}
                 className={this.renderClassNames()}>
                {children}
                <div className="ah-slide-page--lip"></div>
            </div>
        );
    }
}

SlidePage.propTypes = {
    onTurnStart: PropTypes.func,
    onTurnEnd: PropTypes.func,
    onTurnEndResting: PropTypes.func,
    clickTurn: PropTypes.bool
}