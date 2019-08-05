import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './cropper.css';

function getLever(){
    let fulfill;
    const p = new Promise(fulfillPromise => {
        fulfill = fulfillPromise
    })
    p.fulfill = fulfill;
    return p;
}

export default class ImageCropper extends React.Component {

    static propTypes = {
        maxSize: PropTypes.object
    }

    constructor(){
        super();
        this.state = {};
        this._containerWasSet = getLever();
        this._containerWasLoaded = getLever();
        this._containerSizeSet = getLever();
    }

    async componentDidMount(){

        // causes viewport change
        window.addEventListener('resize', () => {
            this._updateViewportState();
        });

        await this._setupContainer();
        this._updateViewportState();
    }

    async _setupContainer(){
        let container = await this._containerWasSet;
        this._loadContainer(container);

        container = await this._containerWasLoaded;

        if(this.props.maxSize){
            this._containerSizeSet.fulfill(this.props.maxSize)
        }else{
            this._computeContainerSize(container);
        }

        const containerDimensions = await this._containerSizeSet;
        this.setState({containerDimensions});
    }

    _computeContainerSize(container){
        let width, height;

        if(container.nodeName === 'IMG'){
            width = container.naturalWidth;
            height = container.naturalHeight;
        }else{
            ({width, height} = container.getBoundingClientRect());
        }

        this._containerSizeSet.fulfill({width, height});
    }

    _loadContainer(container){
        if(container.nodeName === 'IMG'){
            if(container.complete){
                this._containerWasLoaded.fulfill(container)
            }else{
                container.addEventListener('load', _ => this._containerWasLoaded.fulfill(container), {once: true});
            }
        }else{
            this._containerWasLoaded.fulfill(container)
        }
    }

    _updateViewportState(){
        const viewportDimensions = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({viewportDimensions});
    }

    /**
     * Only ever run this once - when we have run this once
     * and the element has rendered we can abandon this since
     * all we want to know is if the container is instantiated
     * 
     * @param {*} container 
     */
    async onRefContainer(container){

        if(container)
            this._containerWasSet.fulfill(container);
    }

    _calcMainDimension(container){
        this.viewportDimensions = ReactDOM.findDOMNode(this).getBoundingClientRect();
        console.log('Viewport is', this.viewportDimensions);

    }

    render(){
        let style = {};
        let mainDimension;
        let vRatio;
        let cRatio;
        let classes = 'ah-cropper ';
        let child;

        if(this.props.zooming){
            classes += 'ah-cropper__zooming';
        }
        

        const {containerDimensions, viewportDimensions} = this.state;

        if(this.state.containerDimensions && this.state.viewportDimensions){
            const deltaHeight = containerDimensions.height - viewportDimensions.height;
            const deltaWidth = containerDimensions.width - viewportDimensions.width;

            vRatio = viewportDimensions.width / viewportDimensions.height;
            cRatio = containerDimensions.width / containerDimensions.height;
    
            // both must be bigger than the viewport - 
            // otherwise we don't need to shrink
            if(deltaHeight > 0 && deltaWidth > 0){
                mainDimension = (vRatio < cRatio) ? 'height' : 'width';
            }
    
            style = {
                flexShrink: 0,
                maxWidth: containerDimensions.width + 'px',
                maxHeight: containerDimensions.height + 'px'
            };
            style.width = 'auto';
            style.height = 'auto';
            style[mainDimension] = this.props.zooming ? '111%' : '101%'; // the 101 is a hack to get rid of the white line
        }


        if(this.props.children instanceof Array)
            child = this.props.children[0];
        else
            child = this.props.children;

        const childEl = React.Children.only(child);
        const container = React.cloneElement(
            childEl,
            {
                style,  
                ref: (ref) => this.onRefContainer(ref)
            }
        )

        return <div className={classes} style={this.props.backgroundCSS}>
            {container}
            {/* <div style={{position:'absolute', opacity: 0.5, bottom:0, left:0, backgroundColor: 'white'}}>
                Width: {containerDimensions && containerDimensions.width}, 
                Height: {containerDimensions && containerDimensions.height},
                V Ratio: {vRatio},
                C Ratio: {cRatio},
            </div> */}
        </div>
    }
}