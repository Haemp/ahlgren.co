import React from 'react';
import SlideShow from './SlideShow';
import ClipPlayer from './../clip-player/ClipPlayer';
import ReactPlayer from 'react-player';
import Image from './../cropper/Image';
import Portfolio from './Portfolio';
import TechIcon from './../tech-icons/TechIcon';
import {List} from './../Typography';

import logo from './../logos/logo-quantic-mind.png';
import './portfolio-quantic-mind.css';
import '../shared.css';

import evolutionaryImage from '../images/quantic-mind-evolutionary.png';
import graphImage from '../images/quantic-mind-graph.png';
import reglageImage from '../images/quantic-mind-reglage.png';
import chainImage from '../images/quantic-mind-chain.png';

import engineeringVideoOverlay from '../images/quantic-mind-engineering-video-overlay.png';
import cultureVideoOverlay from '../images/quantic-mind-culture-video-overlay.png';
import overviewVideoOverlay from '../images/quantic-mind-overview-video-overlay.png';

const engineeringVideo = 'https://www.youtube.com/watch?v=eCsvpbsLja0';
const cultureVideo = 'https://www.youtube.com/watch?v=7NSY-H2niMc';
const overviewVideo = 'https://www.youtube.com/watch?v=A-xkL1qhnkw';
const {Slide} = SlideShow;
const {SplashPage, Page, TextSection, MediaSection, VisitButton, ListSection} = Portfolio;


const QuanticMindPortfolio = {
    name: 'quantic-mind',
    splashLogo: logo,
    getSlides: () => {
        const slides = <div>
            <Page>
                <MediaSection fill={true}>
                    <Image src={evolutionaryImage} effect="zoom" />
                </MediaSection>
                <TextSection>

                    <h1>Smarter Advertising</h1>
                    <p>
                        Based in San Francisco, QuanticMind helps it's customers to optimise 
                        their digital ads. QM enables customers to have a unified dashboard for interacting 
                        with their ads across ad-networks and uses Machine Learning to optimize bids.
                    </p>
                    <p>
                        At QuanticMind I was privileged to work with a lot of incredibly smart people from all over the world.
                        I not only made a lot of new friends but learned a lot under a very dynamic leadership. 
                    </p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <ClipPlayer url={overviewVideo} overlayImage={overviewVideoOverlay} />
                </MediaSection>
                <TextSection>
                    <h1>Responsibilities</h1>
                    <p>
                        Throughout my 2 years at QuanticMind I worked primarily on user facing technology.
                    </p>
                </TextSection>
                <ListSection>
                    <List>
                        <li>Hired as Senior Frontend Engineer</li>  
                        <li>Oversee both UX and UI design and implementation for greenfield projects</li>
                        <li>Help create and steer platform architecture for Frontend and QA</li>
                        <li>Responsible for upgrading a massive legacy codebase</li>
                    </List>
                </ListSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <ClipPlayer url={cultureVideo} overlayImage={cultureVideoOverlay}/>
                </MediaSection>
                <TextSection>
                    <h1>Achievements</h1>
                    <p>
                        I'm very happy with the results of my two years at QuanticMind. Silicon Valley 
                        often works at a breakneck pace but the positive of that is that you get a lot done.
                    </p>
                </TextSection>
                <ListSection>
                    <List>
                        <li>Played instrumental part in educating and deciding on future tech stack</li>  
                        <li>Lead major effort to upgrade old legacy code base</li>
                        <li>Oversaw and helped develop a beautiful new UI design and theme</li>
                        <li>Lead developments on the companies greenfield projects</li>
                    </List>
                </ListSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>Technology</h1>
                    <p>Over the years I worked at QuanticMind I touched on many tech stacks and tools, these are among the most prevalent:</p>
                </TextSection>
                <TechIcon.Container>
                    <TechIcon.Webpack />
                    <TechIcon.Node />
                    <TechIcon.Javascript />
                    <TechIcon.Angular />
                    <TechIcon.Docker />
                    <TechIcon.AWS />
                    <TechIcon.SASS />
                    <TechIcon.Sketch />
                    <TechIcon.Mixpanel />
                    <TechIcon.HTML5 />
                    <TechIcon.CSS3 />
                    <TechIcon.Java />
                </TechIcon.Container>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <ClipPlayer overlayImage={engineeringVideoOverlay} url={engineeringVideo} />
                </MediaSection>
                <TextSection>
                    <h1>Lessons</h1>
                    <p>I learned a lot working at QuanticMind so this is my ham-fisted attempt at a summary:</p>
                </TextSection>
                <ListSection>
                    <List>
                        <li>Tools can make you or break you. Bad tooling is very often responsible for a 
                            significantly lower output by developers</li>  
                        <li>Code is how we get the product, it is not an end in itself.</li>
                        <li>New technology should help developers by allowing them to simplify, 
                            not just by adding features.</li>
                    </List>
                </ListSection>
                <TextSection>
                    <VisitButton url="https://quanticmind.com">Visit QuanticMind.com</VisitButton>
                </TextSection>
            </Page>
        </div>;
        return slides.props.children;
    }
};

export default QuanticMindPortfolio;