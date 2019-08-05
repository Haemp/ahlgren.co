import React from 'react';
import './background-simple.css';

export default class Background extends React.Component{

    constructor(){
        super();

        this.appliedProps = {};
    }

    componentWillReceiveProps(nextProps){
        if(!this._animationLoopStarted)
            this._animationLoop();
    }

    componentDidMount(){
        this._updateColorsFromProps(this.props);
    }

    _updateColorsFromProps(props){
        const {fgGradientStart, fgGradientEnd, bgGradientStart, bgGradientEnd, progress, lightBackground} = props;

        this._updateGradients(fgGradientStart, fgGradientEnd, bgGradientStart, bgGradientEnd, lightBackground);
        this._updateProgress(progress);
    }

    _updateProgress(progress){
        this.hostElement.style.setProperty('--progress', progress);
    }

    _updateGradients(fgGradientStart, fgGradientEnd, bgGradientStart, bgGradientEnd, lightBackground){
        this.hostElement.style.setProperty('--foreground-gradient-start', fgGradientStart);
        this.hostElement.style.setProperty('--foreground-gradient-end', fgGradientEnd);

        this.hostElement.style.setProperty('--background-gradient-start', bgGradientStart);
        this.hostElement.style.setProperty('--background-gradient-end', bgGradientEnd);

        this.hostElement.classList.toggle('ah-background__light', !!lightBackground);
    }

    _animationLoop(){
        this._animationLoopStarted = true;
        requestAnimationFrame(_ => {
            if(this.props !== this.appliedProps){
                this._updateColorsFromProps(this.props);
                this.appliedProps = this.props;
                this._animationLoopStarted = false;
            }
        })
    }

    render(){
        return(
            <div className="ah-background ah-background--full" ref={ref => this.hostElement = ref}>
                <div className="ah-background--background-gradient"></div>
                <div className="ah-background--foreground-gradient"></div>
                <div className="ah-background--stars-bg"></div>
            </div>
        )
    }
}