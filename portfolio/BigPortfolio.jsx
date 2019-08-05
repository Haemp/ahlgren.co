import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Portfolio from './Portfolio';
import SlideShow from './SlideShow';
import recursiveChildren from './../utils/ReactRecursiveChildren';
import ClipPlayer from '../clip-player/ClipPlayer';
import './big-portfolio.css';

const {MediaSection, SplashPage} = Portfolio;

export default class BigPortfolio extends React.Component{

    state = {
        openStatus: 'closed'
    }

    onTurnEnd({pageState}){
        this.setState({openStatus: pageState === 'turned' ? 'opened' : 'closed'});
    }

    onTurnStart(){
        this.setState({openStatus: 'opening'})

        if(this.props.onPortfolioOpened){
            this.props.onPortfolioOpened(ReactDOM.findDOMNode(this))
        }
    }



    render(){

        // rip out the pages from children
        const pages = recursiveChildren(this.props.getSlides(), child => {
            if(child.type === MediaSection){
                return React.cloneElement(child, {...child.props, fill: false, height: 300})
            }else if(child.type === ClipPlayer){
                return React.cloneElement(child, {...child.props, fillWidth: true, fillHeight: true})
            }
            return child;
        })
    
        // analyse the pages content for use of 
        // MediaSection
        const openClass =  'ah-portfolio-big__' + this.state.openStatus;
    
        return (
            <div className={classNames([this.props.className, 'ah-portfolio-big', openClass])}>
                <div className="ah-portfolio-big--inner-wrapper">
                    <div className="ah-portfolio-big--inner-splash">
                        <img className="ah-portfolio--logo" src={this.props.splashLogo} />
                    </div>
                    <div className="ah-portfolio-big--pages">
                        {pages}
                    </div>
                </div>
                {this.state.openStatus !== 'opened' && <div className="ah-portfolio-big--splash-wrapper">
                    <SlideShow.Slide clickTurn={true} 
                                     onTurnStart={_ => this.onTurnStart()} 
                                     onTurnEndResting={evt => this.onTurnEnd(evt)}>
                        <SplashPage logo={this.props.splashLogo} />
                    </SlideShow.Slide>
                </div>}
            </div>
        )
    
    }
} 
