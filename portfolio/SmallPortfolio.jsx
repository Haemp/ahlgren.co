import React from 'react';
import ReactDOM from 'react-dom';
import SlideShow from './SlideShow';
import ClipPlayer from './../clip-player/ClipPlayer';
import classNames from 'classnames';
import Portfolio from './Portfolio';
import recursiveChildren from './../utils/ReactRecursiveChildren';

const {Page} = Portfolio;

/**
 * Adds a click turn for the first slide - the splashpage
 */
export default class SmallPortfolio extends React.Component {

    playControlMap = new Map();
    state = {};
    _slides = [];

    componentDidMount(){
        this.playControlMap = this._getClipPlayerByPageIndex();
    }

    onPortfolioOpened(){
        if(this.props.onPortfolioOpened){
            this.props.onPortfolioOpened(ReactDOM.findDOMNode(this));
        }
    }

    _getClipPlayerByPageIndex(){
        const clipPlayers = new Map();
        this.props.getSlides().forEach((page, index) => {
            recursiveChildren(page.props.children, (child) => {
                if(child.type === ClipPlayer){

                    if(child.name)
                        clipPlayers.set(child.props.name, index)
                    else
                        clipPlayers.set(child.props.url, index)
                }
            })
        })
        return clipPlayers;
    }

    getPlayControlForSlide(slideIndex){
        return !!this.playControlMap[slideIndex];
    }
    
    onNewSlideActive(turnState, slideIndex){
        if(turnState === 'turned'){
            this.setState({activeSlide: slideIndex});
        }
    }   

    render(){
        const slideIndex = this.state.activeSlide;
        this._slides = recursiveChildren(this.props.getSlides(), (child) => {

            if(child.type === ClipPlayer){

                if(this.playControlMap){

                    const pageIndex = this.playControlMap.get(child.props.name || child.props.url);
                    // all clip players should set their playing to false
                    // unless they are inside the active page
                    if(pageIndex !== undefined && slideIndex === pageIndex){
                        return React.cloneElement(child, {...child.props, playing: false})
                    }else{
                        return React.cloneElement(child, {...child.props, playing: undefined})
                    }
                }else{
                    return React.cloneElement(child, {...child.props, playing: undefined})
                }
            }
            return child;
        })
    
        return <div className={classNames([this.props.className, 'ah-portfolio-small'])}>
            <SlideShow splashLogo={this.props.splashLogo} 
                       onSlideActiveRest={(turnState, slideIndex) => this.onNewSlideActive(turnState.pageState, slideIndex)}
                       onFirstSlideTurned={_ => this.onPortfolioOpened()} 
                       renderSlides={() => (
                <div>
                    {this._slides.map((page, index) => (
                        <SlideShow.Slide key={index}>
                            {page}
                        </SlideShow.Slide>
                    ))}
                </div>
            )}/>
        </div>
    }      
}