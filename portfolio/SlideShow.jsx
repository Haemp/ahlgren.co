import React from 'react';
import classNames from 'classnames';
import SlidePage from './SlidePage';
import Portfolio from './Portfolio';
const {Page, SplashPage} = Portfolio;
import SlideShowSplashPage from './SlideShowSplashPage';



import './slideshow.css';
/**
 * TODO
 * [ ] Breadcrumbs
 * [ ] Tranparent first slide
 */


export default class SlideShow extends React.Component{

    state = {
        firstSlideTurned: false,
        showSlides: false,
        fadeOutSplash: false
    }

    componentDidMount(){
        const numberOfSlides = this.props.renderSlides().props.children.length;
        const activeSlideIndex = 0;

        this.setState({
            numberOfSlides,
            activeSlideIndex
        })
    }

    onPreSnap(newActiveSlideIndex){
        if(this.props.onPreSnap){
            this.props.onPreSnap(newActiveSlideIndex);
        }
    }

    _setActiveSlide(index){
        this.setState({
            activeSlideIndex: index
        })

        if(this.props.onSlideActive)
            this.props.onSlideActive(index);
    }

    onTurnEndRest(turnState, slideIndex){

        this.setState({inTransition: false})
        console.log('Setting new active slide to: ', slideIndex, 'State: ', turnState)
        this.props.onSlideActiveRest && this.props.onSlideActiveRest(turnState, slideIndex)
    }

    onTurnEnd(turnState, slideIndex){

        if(!this.state.firstSlideTurned && turnState.pageState === 'turned'){ 
            if(this.props.onFirstSlideTurned){
                this.props.onFirstSlideTurned()
            }
        }

        let newIndex = this.state.activeSlideIndex;
        switch(turnState.turnedEvent){
            case 'turned':
                newIndex = slideIndex + 1;
            break;

            case 'turnedback':
                newIndex = slideIndex;
            break;
        }

        this._setActiveSlide(newIndex);
    }

    /**
     * 1) When we pan -> we render the slide behind it
     * 2) When the front slide is closed only the closed slide and the previous
     *    slide is shown
     */
    renderSlides(){
        console.time('Rendering Slides')
        const slides = [...this.props.renderSlides().props.children].reverse();
        
        const mappedSlides = slides.map((slide, index) => {
            const slideIndex = slides.length-1 -index;
            let className = '';

            if(slideIndex === this.state.activeSlideIndex){
                // if current visible slide
                className = 'ah-slideshow--active-slide'
            }else if(slideIndex === this.state.activeSlideIndex+1){
                // or if it 's the slide just below the current
                // active slide
                className = 'ah-slideshow--below-active-slide'
            }

            return React.cloneElement(slide, {
                ...slide.props, 
                key: slideIndex, 
                className,
                onTurnEnd: turnState => this.onTurnEnd(turnState, slideIndex),
                onTurnStart: () => this.setState({inTransition: true}),
                onTurnEndResting: turnState => this.onTurnEndRest(turnState, slideIndex)
            })
        });

        console.timeEnd('Rendering Slides');
        return mappedSlides;
    }

    renderCrumbs(numberOfSlides, activeSlideIndex){
        const crumbs = []
        for(var i = numberOfSlides-1; i >= 0; i--){
            if(i === activeSlideIndex){
                crumbs.unshift(<div key={i} className="ah-slideshow--crumb ah-slideshow--crumb__active"></div>)
            }else{
                crumbs.unshift(<div key={i} className="ah-slideshow--crumb"></div>)
            }
            
        }
        return crumbs;
    }

    slideshowClassNames(){
        return classNames({
            "ah-slideshow": true,
            "ah-slideshow__in-transition": this.state.inTransition
        })
    }

    onStartLoading(){
        this.setState({showSlides: true})

        // now we want until all the layout etc
        // has been done and then we show the slides
        setTimeout(e => {
            this.setState({fadeOutSplash: true})
        }, 1000)
    }

    onSplashFadeOut(){
        this.setState({hideSplashPage: true})
    }

    render(){
        const {numberOfSlides, activeSlideIndex} = this.state;
        const slides = this.renderSlides();

        return ( 
            <div className={this.slideshowClassNames()}>
                {this.state.showSlides && 
                    <React.Fragment>
                        {slides}
                        <div className="ah-slideshow--crumbs">
                            {this.renderCrumbs(numberOfSlides, activeSlideIndex)}
                        </div>
                    </React.Fragment>
                }
                {!this.state.hideSplashPage && 
                    <SlideShowSplashPage onStartLoading={e => this.onStartLoading()} 
                                         onFadeOut={e => this.onSplashFadeOut()}
                                         fadeOut={this.state.fadeOutSplash} 
                                         logo={this.props.splashLogo} />
                }
            </div>
        )
    }
}



SlideShow.Slide = SlidePage;