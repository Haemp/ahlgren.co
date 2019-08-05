import React from 'react';
import classNames from 'classnames';
import SlidePage from './SlidePage';
import Portfolio from './Portfolio';

const {Page, SplashPage} = Portfolio;

const LoadingPage = props => <Page className="ah-slideshow--loading-page">
    <div className="ah-slideshow--loading-page-inner-wrapper">
        Hang on...
    </div>
</Page>;

export default class SlideShowSplashPage extends React.Component{

    static FADE_OUT_TIME = 500;

    state = {
        fadeOut: false,
        turningState: 'normal'
    };

    componentWillReceiveProps(newProps){
        if(this.props.fadeOut !== newProps.fadeOut && newProps.fadeOut === true){
            this.fadeOut()
        }
    }

    fadeOut(){
        this.setState({fadeOut: true});
        setTimeout(_ => {
            if(this.props.onFadeOut)
                this.props.onFadeOut()
        }, SlideShowSplashPage.FADE_OUT_TIME)
    }

    onTurnStart(){
        this.setState({turningState: 'turning'})
    }

    startLoading({pageState}){
        if(this.props.onStartLoading && pageState === 'turned'){
            this.props.onStartLoading();
        }
        
        this.setState({turningState: pageState})
    }

    render(){
        return <div className={classNames('ah-slideshow--splash-page__' + this.state.turningState, {
            'ah-slideshow--splash-page__fade-out': this.state.fadeOut
        })}>
            <LoadingPage />
            <SlidePage clickTurn={true} 
                       onTurnEndResting={pageEvent => this.startLoading(pageEvent)} 
                       onTurnStart={e => this.onTurnStart()}>
                <SplashPage logo={this.props.logo} />
            </SlidePage>
        </div>
    }
}