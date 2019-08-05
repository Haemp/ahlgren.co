import React from 'react';
import SlideShow from './SlideShow';
import ClipPlayer from './../clip-player/ClipPlayer';
import TechIcon from './../tech-icons/TechIcon';
import Image from './../cropper/Image';
import Portfolio from './Portfolio';

import logo from './../logos/logo-sideview.svg';
import './portfolio.css';
import './portfolio-sideview.css';
import '../shared.css';

import sideViewImage1Overlay from './../images/sideview-video2-overlay.png';
import sideViewYoutubeOverlay from './../images/sideview-youtube-overlay.png';
import webpackImage from '../images/webpack-image.png';
import sideviewLogo from '../images/sideview-logo.png';

const sideViewVideo1 = 'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fsideview-video2.mp4?alt=media&token=ca0197be-6a4c-41a3-9e9c-a65e86f138c4';
const sideViewYoutubeVideo = 'https://www.youtube.com/watch?v=fygOPbztAYc';
const {Slide} = SlideShow;
const {SplashPage, Page, TextSection, MediaSection, VisitButton} = Portfolio;

const SideViewPortfolio = {
    name: 'sideview',
    splashLogo: sideviewLogo,
    getSlides: () => {
        const slides = <div>
            <Page>
                <MediaSection fill={true}>
                    <ClipPlayer url={sideViewYoutubeVideo} overlayImage={sideViewYoutubeOverlay} />
                </MediaSection>
                <TextSection>
                    <h1>The Component Editor</h1>
                    <p>
                        SideView is a new tool in a web developers arsenal. It's created to solve 
                        the two biggest problems in web development today - context switching and workflow fragmentation.
                    </p>
                    <p>Please see the intro video above - narrated by yours truly ;)</p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <ClipPlayer url={sideViewVideo1} overlayImage={sideViewImage1Overlay} fillHeight={true} fillWidth={true}/>
                </MediaSection>
                <TextSection>
                    <h1>Kill the context switch</h1>
                    <p>
                        SideView is a component editor. What that means is that it allows developers to code, style and debug 
                        their application in isolated components - something that has been eluding the modern workflow for 
                        a long time.
                    </p>
                    <p>
                        SideView also lets you setup custom state around your components to radically 
                        improve the traditional the edit-save-refresh workflow.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>How it Works</h1>
                    <p>
                        When the user selects a file for preview, SideView first has to figure out how to build it. 
                        It does this through analysing the file name and contents. After this it creates a webpack 
                        configuration to handle the build. 
                    </p>
                </TextSection>
                <TechIcon.Container>
                    <TechIcon.Webpack />
                    <TechIcon.Node />
                    <TechIcon.Javascript />
                </TechIcon.Container>
                <TextSection>
                    <p>
                        After the component is built it is served through a built in web server. SideView also handles 
                        live reloading the component whenever it detects a change to any of the dependencies.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>Technology</h1>
                    <p>
                        I personally love working with Electron and for this project it was a great fit. For the front end I am mainly using React. 
                        I'm also using Firebase services and integrated Google Analytics events for segmented user tracking - because good user feedback is everything. 
                    </p>
                    <p>
                        For error reporting I'm using Sentry.io - a great free service. 
                    </p>
                </TextSection>
                <TechIcon.Container>
                    <TechIcon.React />
                    <TechIcon.Firebase />
                    <TechIcon.Electron />
                    <TechIcon.Sentry />
                </TechIcon.Container>
                <TextSection>
                    <p>
                        The development process of SideView followed an intensely user focused process. Iterating
                        several times a week and letting user feedback along with product vision dictate the direction.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <Image src={webpackImage} effect="zoom" />
                </MediaSection>
                <TextSection>
                    <h1>Lessons</h1>
                    <p>
                        This project originally started out as a fork of Chrome Devtools. Extending devtools 
                        was a very interesting problem and I learned a lot from it, but in the end I decided that
                        due to scope issues the MVP was better served as a standalone app rather than a full on 
                        devtools fork. 
                    </p>
                    <p>
                        SideView leant itself very well to fast product iteration cycles because I was able to dog-food 
                        it while developing. To build a great product you have to understand how it's used - and 
                        dog-fooding is a brilliant way to do just that.
                    </p>
                </TextSection>
            </Page>
            <Page>  
                <MediaSection fill={true}>
                    <Image src={sideviewLogo} size="none" effect="zoom" />
                </MediaSection>
                <TextSection>
                    <h1>A Component Future!</h1>
                    <p>
                        I'm convinced that the future of web development is increasingly componentised 
                        and I hope that SideView can help be part of that.     
                    </p>
                    <p>
                        Because the web is a really fun platform to work on and we should strive to make it simple!
                    </p>
                    <VisitButton url="https://sideview.fun">Visit SideView.fun</VisitButton>
                </TextSection>
            </Page>
        </div>;

        return slides.props.children;
    }
}


export default SideViewPortfolio