import React from 'react';

import ClipPlayer from './../clip-player/ClipPlayer';
import TechIcon from './../tech-icons/TechIcon';
import Portfolio from './Portfolio';

import strowLogoSvg from './../logos/strow-logo.svg';
import './portfolio-strow.css';
import '../shared.css';

const strowVideoTick = 'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fstrow-video-tick.mp4?alt=media&token=92c76f74-8379-4178-ab4b-62b94d8536c3';
const strowVideo2 = 'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fstrow-video2.mp4?alt=media&token=d990ada7-42d6-47fd-8bdb-3481e7e90f0c';
const strowVideoTitle = 'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fstrow-video-title.mp4?alt=media&token=6a96af34-ba88-4efd-9206-0633323b2f6f';
const strowVideoCreate = 'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fshappy-video-create.mp4?alt=media&token=4ab1fab1-a16f-458b-8deb-bad13f26b4cd';

import strowTickOverlay from '../images/strow-video-overlay-tick.png';
import strowVideo2Overlay from '../images/strow-video2-overlay.png';
import strowTitleOverlay from '../images/strow-video-overlay-title.png';

const {MediaSection, TextSection, Page, SplashPage, VisitButton} = Portfolio;
const fillHeightOpts = {
    fillHeight: true,
    overlayImageOptions: {
        fillHeight: true
    }
}

const fillWidthOpts = {
    fillWidth: true,
    overlayImageOptions: {
        fillWidth: true
    }
}
const StrowContent = {
    name: 'strow',
    splashLogo: strowLogoSvg,
    getSlides:  () => {
        const slides = <div>
            <Page>
                <MediaSection fill={true}>
                    <ClipPlayer url={strowVideoTitle} 
                                overlayImage={strowTitleOverlay} 
                                {...fillHeightOpts}/>
                </MediaSection>
                <TextSection>
                    <h1>A different take on Habit Tracking</h1>
                    <p>
                        Strow is an expriment in intuitive interface design by using 
                        physical bodies to represent streaks and habits.
                    </p>
                    <p>
                        Strow is a complete installable PWA that works as well on mobile as it does 
                        on desktop.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>How it works</h1>
                    <p>
                        Instead of tracking your habts with a boring streak number (who needs numbers anyway) - 
                        Strow represents habits and it's streaks with physical bodies.
                    </p>
                </TextSection>
                <MediaSection fill={true}>
                    <ClipPlayer url={strowVideoTick} overlayImage={strowTickOverlay} {...fillHeightOpts} />
                </MediaSection>
                <TextSection>
                    <p>
                        Every time you "tick" a habit (represented by a ball) you earn a 
                        smaller orbiting ball around your habit, representing your streak.
                    </p> 
                    <p>
                        This way your habit success is represented by small orbiting 
                        balls all interacting with each other as real physical entities.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>Tools</h1>
                    <p>
                        I developed the app completely from idea to the final implementation (fullstack development is a hell of a drug).
                        It was designed through Sketch and implemented with VSCode and SideView.
                    </p>
                </TextSection>
                <TechIcon.Container>
                    <TechIcon.Sketch />
                    <TechIcon.SideView />
                    <TechIcon.Matter />
                </TechIcon.Container>
                <TextSection>
                    <p>
                        Strow uses a javascript physics engine called <a target="_blank" href="http://brm.io/matter-js/">Matter.js </a> 
                        to represent the habits and streaks. Matter.js enables the planatery like interactions of the habits. It also 
                        makes it possible to fling around your habits because... why not?
                    </p>
                    <p>
                        Strow is also hosted and managed through Firebase, which makes for a fantastic workflow.
                    </p> 
                </TextSection>
            </Page>
            <Page>
                <TextSection>
                    <h1>Technology</h1>
                    <p>
                        Strow is a webapp build with the modern web toolset: ES6 built with Webpack and Babel. Strow also uses WebComponents 
                        natively - together with my own simple templating library: <a target="_blank" href="https://github.com/Haemp/simply.js">Simply.js.</a>
                    </p>
                </TextSection>
                <TechIcon.Container>
                    <TechIcon.GoogleCloudFunctions />
                    <TechIcon.Javascript />
                    <TechIcon.Firebase />
                    <TechIcon.Webpack />
                </TechIcon.Container>
                <TextSection>
                    <p>
                        To make Strow work as an mobile app I use <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API">ServiceWorker </a> 
                        to allow offline capabilities. I also use the PushNotification API of ServiceWorker along with Firebase integration 
                        to make notifying users really easy. 
                    </p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <ClipPlayer url={strowVideoCreate} name="strow-end-clip"
                                    overlayImage={strowTitleOverlay} 
                                    {...fillWidthOpts}/>
                </MediaSection>
                <TextSection>
                    <h1>Towards a modern Web!</h1>
                    <p>
                        I learned a great many things about modern web development, got a lot of exprience using a boat load of
                        modern apis like WebAudio, PushNotifications and ServiceWorker. 
                    </p>
                    <p>
                        When I first started out in Web Development CSS was the new hot things and we all thought IE6 was our destiny.
                        Now more than 15 years later it's safe to say things got better - and hopefully they will keep on getting better
                        the farther we go
                    </p>
                    <VisitButton url="https://strive-2.firebaseapp.com/">Visit Strow</VisitButton>
                </TextSection>
            </Page>
        </div>;

        return slides.props.children
    },
}


export default StrowContent