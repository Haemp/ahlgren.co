import React from 'react';
import ClipPlayer from './ClipPlayer';
import SlideShow from './portfolio/SlideShow';
import Portfolio from './portfolio/Portfolio';
import strowVideo1 from './video/strow-video1.mp4';

const {Page, MediaSection, TextSection} = Portfolio;

export default class VideoTest extends React.Component{

    constructor(){
        super();
        this.state = {};
    }

    componentWillReceiveProps(newProps){
        console.log('New props ', newProps)
    }

    onActiveSlide(activeSlide){
        if(activeSlide === 2){
            console.log('Should play video now')
            console.profile('Should play slide')
            console.trace();
            this.setState({
                playVideo: true
            })
            console.profileEnd('Should play slide')
        }
    }

    render(){
        return <SlideShow onPreSnap={activeSlide => this.onActiveSlide(activeSlide)} renderSlides={() => 
            <div>
                <SlideShow.Slide name="Slide1">
                    <h1>Hej</h1>
                </SlideShow.Slide>
                <SlideShow.Slide name="Slide2">
                    <h1>Hej</h1>
                </SlideShow.Slide>
                <SlideShow.Slide name="Slide3">
                    <Page>
                        <MediaSection fill={true}>
                            <ClipPlayer playing={this.state.playVideo} url={strowVideo1} />
                        </MediaSection>
                        <TextSection>
                            <h1>A different take on Habit</h1>
                            <p>Strow is an expriment in intuitive interface design and using physical bodies to represent streaks and habits.</p>
                        </TextSection>
                    </Page>
                </SlideShow.Slide>
                <SlideShow.Slide name="Slide4">
                    <h1>Hej</h1>
                </SlideShow.Slide>
                <SlideShow.Slide name="Slide5">
                    <h1>Hej</h1>
                </SlideShow.Slide>
            </div>
        }>
        </SlideShow>
    }
}