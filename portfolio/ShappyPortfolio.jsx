import React from 'react';
import SlideShow from './SlideShow';
import ClipPlayer from './../clip-player/ClipPlayer';
import ReactPlayer from 'react-player';
import Cropper from './../cropper/Cropper';
import Portfolio from './Portfolio';
import TechIcon from './../tech-icons/TechIcon';

import logo from './../logos/logo-shappy.svg';
import './portfolio-shappy.css';
import '../shared.css';

const shappyVideoTitle = 'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fshappy-video-title.mp4?alt=media&token=4e0fda13-833b-4ee0-8217-1be9624f259a';
const shappyVideoCreate = 'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fshappy-video-create.mp4?alt=media&token=4ab1fab1-a16f-458b-8deb-bad13f26b4cd';

import shappyVideoOverlayTitle from './../images/shappy-video-overlay-title.png';
import shappyVideo2Overlay from './../images/shappy-video2-overlay.png';
import goShappyImage from '../images/shappy-image.png';

const sideViewYoutubeVideo = 'https://www.youtube.com/watch?v=fygOPbztAYc';
const {Slide} = SlideShow;
const {SplashPage, Page, TextSection, MediaSection, VisitButton} = Portfolio;

const fillWidthOpts = {
    fillWidth: true,
    overlayImageOptions: {
        fillWidth: true
    }
}

const fillHeightOpts = {
    fillHeight: true,
    overlayImageOptions: {
        fillHeight: true
    }
}


const ShappyPortfolio = {
    name: 'shappy',
    splashLogo: logo,
    getSlides: () => {
        const slides = <div>
            <Page>
                <MediaSection height={250}>
                    <ClipPlayer overlayImage={shappyVideoOverlayTitle} url={shappyVideoTitle} {...fillWidthOpts} />
                </MediaSection>
                <TextSection>
                    <h1>Filesharing Without Limits</h1>
                    <p>
                        Shappy is a cross platform desktop application for file sharing.
                    </p>
                    <p>
                        It is based on open standard WebRTC technology behind the scenes. The goal
                        with Shappy was to make sharing any file on your computer as simple as sharing
                        a URL. It has an incredibly simple and intuitive interface to make sharing files
                        <b> ridonculously</b> simple.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection height={250}>
                    <ClipPlayer fillWidth={true} alignTop={true} overlayImage={shappyVideo2Overlay} url={shappyVideoCreate} />
                </MediaSection>
                <TextSection>
                    <h1>How it works</h1>
                    <p>
                        All you need to do is install shappy on your Mac or Windows machine. 
                        Then just drag the file you want to share over the little bird icon in the task bar.
                    </p>
                    <p>
                        Shappy then creates a URL that works from <b>any</b> browser. 
                    </p>
                    <p>
                        The file is shared directly from the computer so there is no need to upload anything
                        and no need to trust third party servers. 
                    </p>
                </TextSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>Tools and Tech</h1>
                    <p>
                        Shappy is an Electron app with some native extensions added to 
                        handle deeper integration with the target OS. 
                    </p>
                </TextSection>
                <TechIcon.Container>
                    <TechIcon.Node />
                    <TechIcon.WebRTC />
                    <TechIcon.Javascript />
                    <TechIcon.Electron />
                </TechIcon.Container>
                <TextSection>
                    <p>
                        The (admittedly simple) frontend has no framework but uses WebComponents and Simply.js for 
                        templating along with basic HTML5 and ES6. 
                    </p>
                    <p>
                        Although the build is very simple I still choose to use Webpack and Babel with this project 
                        to be able to use the latest ES6 standards. 
                    </p>
                </TextSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>WebRTC</h1>
                    <p>
                        To simplify the client setup for WebRTC I use a library called PeerJs. 
                        I then also need a signaling server working over a secure port. For this I used
                        a basic node socket server  - hosted on google compute engine. 
                    </p>
                </TextSection>
                <TechIcon.Container>
                    <TechIcon.GoogleCloudFunctions />
                    <TechIcon.GoogleSQL />
                    <TechIcon.GoogleComputeEngine /> 
                </TechIcon.Container>
                <TextSection>
                    <p>To manage the links to the shared files I'm using Google cloud functions 
                        and Google Cloud SQL (yay serverless!)</p>
                    <p>For this project I'm also using two different micro node services to handle 
                        emaling users and uploading the binary files to google drive where they are hosted. #AutomateEVERYTHING!</p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection height={250}>
                    <ClipPlayer overlayImage={shappyVideoOverlayTitle} url={shappyVideoTitle} {...fillWidthOpts} />
                </MediaSection>
                <TextSection>
                    <h1>Truly fullstack</h1>
                    <p>Building Shappy took me all over the place - from debugging desktop applications  
                        on windows to debugging RTC network traffic over wireshark, creating many small  
                        node services and also designing the look and feel of the app.</p>
                    <p>All great fun!</p>
                    <VisitButton url="https://shappy.io">Visit Shappy.io</VisitButton>
                </TextSection>
            </Page>
        </div>;
        return slides.props.children;
    }
}

export default ShappyPortfolio;