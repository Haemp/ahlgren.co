import React from 'react';
import ReactDOM from 'react-dom';
import Background from './BackgroundSimple';
import Intro from './sections/Intro';
import Projects from './sections/Projects';
import Companies from './sections/Companies';
import Skills from './sections/Skills';
import Abilities from './sections/Abilities';
import Future from './sections/Future';
import {Page} from './Layout';
import ClientState from './ClientState';
import preloadImages from './ImagePreloader';
import Portfolio from './portfolio/PortfolioComponent'; 
import animateScrollDown from './utils/ScrollAnimator';

import './ahlgren.css';
import './images/favicon.png';
import WhoAmI from './portfolio/whoami/WhoAmI';

const defaultColors = {start: '#3b6b97', end: '#002142'};
const sectionColors = [
    {section: 'intro', selector: '.ah-intro', color: {...defaultColors}},
    {section: 'strow', selector: '.ah-portfolio--strow', color: {start: '#464262', end: '#36324f'}},
    {section: 'sideview', lightBackground: true, selector: '.ah-portfolio--sideview', color: {start: '#fff', end: '#fff'}},
    {section: 'shappy', selector: '.ah-portfolio--shappy', color: {start: '#555554', end: '#424241'}},
    {section: 'companies', selector: '.ah-companies', color: {...defaultColors}},
    {section: 'quanticmind', selector: '.ah-portfolio--quantic-mind', color: {start: '#037AE0', end: '#00580F'}},
    {section: 'qudini', selector: '.ah-portfolio--qudini', color: {start: '#d5333f', end: '#7a060e'}},
    {section: 'abilities', selector: '.ah-abilities', color: {...defaultColors}},
];
const scrollContainerSelector = '.ah-ahlgren--con';


export default class Ahlgren extends React.Component{
    constructor(){
        super();

        this._viewPortRect = {};
        this.state = {
            fgGradientStart: defaultColors.start,
            fgGradientEnd: defaultColors.end,
            bgGradientStart: defaultColors.start,
            bgGradientEnd: defaultColors.end,
            progress: 0,
            leftIntro: false,
            viewModeClass: ClientState.getViewModeClass()
        };
    }

    onIntroReady(){

        this._loadingFinished().then(_ => {
            this.setState({playIntro: true});
        });    
    }

    _loadingFinished(){
        return new Promise(fulfill => {
            if(window.loadingFinished){
                fulfill()
            }else {
                window.addEventListener('loading-finished', _ => {
                    fulfill();
                })
            }
        })
    }

    componentDidMount(){
        this._setupScrollColors();

        this._viewPortRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    }

    _setupScrollColors(){

        // map the gradients to each Project and 
        // Company section
        // now we add the start and end coordinates to the 
        // section onjects
        // sectionColors.forEach(section => {
        //     const rect =  document.querySelector(section.selector).getBoundingClientRect();
        //     section.startY = rect.top;
        //     section.endY = section.startY + rect.height;
        // })

        // add scroll listener
        document.querySelector(scrollContainerSelector).addEventListener('scroll', (event) => {
            
            // when ever we scroll determine the progress from the current section
            // to the next based off topScroll to the closest scroll breakpoint
            const scrollPos = event.target.scrollTop;
            //this._setStateFromScrollPos(scrollPos);
            if(!this.state.leftIntro){
                let leftIntro = this._viewPortRect && scrollPos > this._viewPortRect.height;

                if(leftIntro)
                    this.setState({leftIntro}); 
            }
        }, {passive: true})
        
        //this._setStateFromScrollPos(0);
    }

    _setStateFromScrollPos(scrollPos){
        let fgGradientStart = defaultColors.start;
        let fgGradientEnd = defaultColors.end;
        let bgGradientStart = defaultColors.start;
        let bgGradientEnd = defaultColors.start;
        let lightBackground = false;
        let progress = 0;

        for(var i = 0; i < sectionColors.length; i++){
            const section = sectionColors[i];
            const nextSection = i < sectionColors.length ? sectionColors[i+1] : null;

            // in this case the progress in always 1 since we are within the
            // bounds of a breakpoint
            if(scrollPos >= section.startY && scrollPos <= section.endY){
                progress = 0;
                const targetSection = section;
                const previousSection = i >= 0 ? sectionColors[i-1] : null;

                fgGradientStart = section.color.start;
                fgGradientEnd = section.color.end;
                bgGradientStart = nextSection.color.start;
                bgGradientEnd = nextSection.color.end;
                lightBackground = section.lightBackground;
                progress = 0;

                break;
            }
            
            // if there is no next section we
            // animate back to the default colors
            if(!nextSection){ 
                break;
            }

            // check if the scroll position is between the section and the next section
            if(scrollPos >= section.endY && scrollPos <= nextSection.startY){

                const part = scrollPos - section.endY;
                const whole = nextSection.startY - section.endY;
                progress = part/whole;

                fgGradientStart = section.color.start;
                fgGradientEnd = section.color.end;

                bgGradientStart = nextSection.color.start;
                lightBackground = nextSection.lightBackground;
                bgGradientEnd = nextSection.color.end;
                break;
            }
        }

        this.setState({
            lightBackground,
            fgGradientStart,
            fgGradientEnd,
            bgGradientStart,
            bgGradientEnd,
            progress,
            leftIntro
        })
    }

    onPortfolioOpened(portfolioElement){
        console.log('portfolio opened')
        if(ClientState.getViewMode() === ClientState.MODE_SMALL){
            portfolioElement.scrollIntoView(true);
        }
    }
    

    onIntroFinished(){
        // now we trigger a little bitty scroll to encourage
        // the user to scroll down
        animateScrollDown(this.mainContainer, 2000, ClientState.getViewHeight() * 2.5);

        this.setState({leftIntro: true})
    }

    render(){

        return (
            <div className={'ah-ahlgren '+this.state.viewModeClass}>
                <Background fgGradientStart={this.state.fgGradientStart} 
                            fgGradientEnd={this.state.fgGradientEnd} 
                            bgGradientStart={this.state.bgGradientStart}
                            lightBackground={this.state.lightBackground}
                            progress={this.state.progress}
                            bgGradientEnd={this.state.bgGradientEnd}/>
                <div ref={ref => this.mainContainer = ref} className="ah-ahlgren--con">
                    <div className="ah-intro--page">
                        <div className="ah-intro--container" >
                            <Intro pause={this.state.leftIntro} play={this.state.playIntro} onFinished={_ => this.onIntroFinished()} onReady={_ => this.onIntroReady()} />
                        </div>
                    </div>
                    {true && <div className="ah-main-content">
                        <Projects onPortfolioOpened={portfolioElement => this.onPortfolioOpened(portfolioElement)} />
                        <Companies onPortfolioOpened={portfolioElement => this.onPortfolioOpened(portfolioElement)} />
                        <Portfolio {...WhoAmI} onPortfolioOpened={portfolioElement => this.onPortfolioOpened(portfolioElement)} />
                    </div>}
                </div>
            </div>
        );
    }
}