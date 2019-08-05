import React from 'react';
import SlideShow from './SlideShow';
import ClipPlayer from './../clip-player/ClipPlayer';
import ReactPlayer from 'react-player';
import Image from './../cropper/Image';
import Portfolio from './Portfolio';
import TechIcon from './../tech-icons/TechIcon';

import logo from './../logos/logo-qudini.png';
import './portfolio.css';
import './portfolio-qudini.css';
import '../shared.css';

import qudiniImage from '../images/qudini-image.png';
import qudiniImage2 from '../images/qudini2-image.png';
import { List } from '../Typography';
import QuanticMindPortfolio from './QuanticMindPortfolio';
import qudiniVideoOverlay from './../images/qudini-video-overlay.png';
import qudiniVideoO2Overlay from './../images/qudini-video-o2-overlay.png';

const qudiniYoutubeVideo = 'https://www.youtube.com/watch?v=sjRBmc2zQ1U';
const qudiniO2Video = 'https://www.youtube.com/watch?v=FzDOAnrrjsw';

const {Slide} = SlideShow;
const {SplashPage, Page, TextSection, MediaSection, VisitButton, ListSection} = Portfolio;

const QudiniPortfolio = {
    name: 'qudini',
    splashLogo: logo,
    getSlides: () => {
        const slides = <div>
            <Page>
                <MediaSection fill={true}>
                    <ClipPlayer url={qudiniO2Video} overlayImage={qudiniVideoO2Overlay} fillWidth={true} />
                </MediaSection>
                <TextSection>
                    <h1>Kill the Queue</h1>
                    <p>
                        Qudini is a queue and customer experience management tool for 
                        retail and restaurants. Nursing a full-blown hatred for wasting time in a line, the 
                        idea behind Qudini really got me interested. 
                    </p>
                    <p>
                        After having a chat with the founders I knew this was where I had to go. I 
                        joined as the first hire and were lucky enough to follow a 
                        fledgling startup grow from office to office, turning the first 
                        pounds of profit and building a world class team.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>Achievements</h1>
                    <p>Throughout my 2 years at Qudini I worked as the only front end 
                        developer and did everything from writing ad hoc IOS apps for 
                        ticket printing machines to developing a component architecture 
                        in AngularJS. Some achievements that I'm particularly proud of are:</p>
                </TextSection>
                <ListSection>
                    <List>
                        <li>Restaurant wait list application based on HTML5 (AngularJS) running as a hybrid app in many popular restaurants in London.</li>  
                        <li>Web applications for queue management/calendars/account management etc. built in AngularJS that is used daily by some of UKs leading retailers (o2 and House of Fraser to name a few).</li>
                        <li>Designing unifying themes across apps while prototyping and implementing new features.</li>
                    </List>
                </ListSection>
            </Page>
            <Page>
                <MediaSection height={300}>
                    <ClipPlayer url={qudiniYoutubeVideo} overlayImage={qudiniVideoOverlay} />
                </MediaSection>
                <TextSection>
                    <h1>Technology</h1>
                    <p>When I started at qudini I quickly realized that jquery + backbone 
                        would not cut it. I decided to go with AngularJS then and I've never 
                        looked back. The main technologies included in Qudini's front end is:</p>
                </TextSection>
                <ListSection>
                    <List>
                        <li>AngularJS - the bread and butter framework</li>  
                        <li>SASS - A very powerful preprocessor that enables really reusable css</li>
                        <li>Grunt and Gulp - to manage the build processes like, spritesheet generation, minification, html/css inlining</li>
                    </List>
                </ListSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <Image src={qudiniImage2} effect="zoom" />
                </MediaSection>
                <TextSection>
                    <h1>An Adventure</h1>
                    <p>
                        It might sound sappy but Qudini made me the developer I am today. Learning and 
                        growing side by side by a group of extremely talented people has been a real 
                        adventure.
                    </p>
                    <p>
                        On the tech side being forced to make architectural decisions while
                        still delivering at a high pace was not always easy - but man did I learn a lot!
                    </p>
                    <VisitButton url="https://qudini.com">Visit Qudini</VisitButton>
                </TextSection>
            </Page>
        </div>;
        return slides.props.children;
    }
};

export default QudiniPortfolio;