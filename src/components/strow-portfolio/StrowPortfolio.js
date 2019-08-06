// @ts-check
import React from 'react';
import { Box, AspectBox, A } from '../theme/ThemeComponents';
import Portfolio from '../portfolio/Portfolio';
import styled from 'styled-components';
import { Paragraph, H1, Link, H2, SubTitle } from '../typography/Typography';
import portfolioCover from './cover-strow.png';

import { Icon, IconContainer } from '../icon-container/IconContainer';
import VideoPlayer from '../video-player/VideoPlayer';
import { ScaledTitle } from '../theme/ScaledComponents';
import SkillsContainer from '../skills/SkillsContainer';
import PortfolioButton from '../portfolio/PortfolioButton';
const strowVideo2 =
    'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fstrow-video2.mp4?alt=media&token=d990ada7-42d6-47fd-8bdb-3481e7e90f0c';
const strowVideoTick =
    'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fstrow-video-tick.mp4?alt=media&token=92c76f74-8379-4178-ab4b-62b94d8536c3';
const strowVideoTitle =
    'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fstrow-video-title.mp4?alt=media&token=6a96af34-ba88-4efd-9206-0633323b2f6f';
const strowVideoCreate =
    'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fstrow-video-new-habit.mp4?alt=media&token=26992eba-6272-46af-b692-893346c30432';

const FullImg = styled.img`
    height: 100%;
    width: 100%;
`;

const CoverImageSizer = props => {
    return (
        <Box center parentFill>
            <FullImg src={props.cover} />
        </Box>
    );
};

export default props => (
    <Portfolio cover={<CoverImageSizer cover={portfolioCover} />}>
        <Box spacing="30px">
            <Box>
                <ScaledTitle center>
                    <A href="https://strive-2.web.app/" target="_blank">
                        Strow
                    </A>
                </ScaledTitle>
                <SubTitle>
                    Strow is an experimental habit tracker using physical bodies
                    to represent streaks and habits.
                </SubTitle>
            </Box>
            <AspectBox aspect="1920:1080">
                <VideoPlayer
                    playing={true}
                    autoPlay={true}
                    playerProps={{ controls: false, loop: true }}
                    url={strowVideoCreate}
                />
            </AspectBox>
            <H1>Responsibilities</H1>
            <Paragraph>
                I developed the idea and took it all the way to the deployed
                product. Since this was an experimental application, there were
                no customer development as part of this project.
            </Paragraph>
            <SkillsContainer
                skills={['frontend', 'backend', 'ui', 'product']}
            />
            <H1>Tech</H1>
            <Paragraph>
                Design and prototyping for Strow was developed in Sketch and
                Sideview. What I usually do to get inspiration for new UI looks
                is to spend a couple of minutes scrolling{' '}
                <A href="https://dribbble.com">Dribbble.com</A>. Then translate
                interesting colors and styles into an integrated theme.
            </Paragraph>
            <IconContainer>
                <Icon name="sketch" secondaryLabel="Sketch" />
                <Icon name="sideview" secondaryLabel="Sideview" />
            </IconContainer>
            <H2>Frontend</H2>
            <Paragraph>
                The frontend of Strow is built using the standard JavaScript
                developer toolset: ES6 compiled with webpack. I used Strow to
                experiment a bit with native WebComponents to see where they
                compare against Angular and React.
            </Paragraph>
            <Paragraph>
                What I found was the templating support (the problem JSX solves)
                is pretty basic. So I decided to create my own simple
                templating library (
                <A href="https://github.com/Haemp/simply.js" target="_blank">
                    Simply.js
                </A>
                ) to solve this problem.
            </Paragraph>
            <IconContainer>
                <Icon name="javascript" secondaryLabel="ES6" />
                <Icon name="html5" secondaryLabel="HTML 5" />
                <Icon name="webpack" secondaryLabel="Webpack" />
            </IconContainer>
            <Paragraph>
                To simulate the physics I went with a physics engine called
                matter.js. It's a really easy one to get started with and it's
                plugin architecture makes it very flexible to extend.
            </Paragraph>
            <IconContainer>
                <Icon name="sass" secondaryLabel="SASS" />
                <Icon name="matterjs" secondaryLabel="Matter" />
            </IconContainer>
            <H2>Backend</H2>
            <Paragraph>
                Finally for the backend and hosting services I used a mixture of
                GCE and Firebase. I started using firebase back in 2014 and it
                as really come a long way since then.
            </Paragraph>
            <Paragraph>
                To make Strow work as a mobile app I use ServiceWorker to allow
                offline capabilities. I also use the PushNotification API of
                ServiceWorker along with Firebase integration to make notifying
                users really easy.
            </Paragraph>
            <IconContainer>
                <Icon name="google-compute-engine" secondaryLabel="GCE" />
                <Icon name="node" secondaryLabel="Node" />
                <Icon name="firebase" secondaryLabel="Firebase" />
            </IconContainer>
            <H1>Challenges</H1>
            <Paragraph>
                I'd say dealing with the holes in the native web platform was
                the main challenge in this project. But it also made me
                appreciate the efforts put in but all the modern frameworks to
                overcome this.
            </Paragraph>
            <H1>Lessons</H1>
            <Paragraph>
                This was a weekend hackathon project that ended up teaching me a
                lot. Working with a physics engine, getting down and dirty with
                all the new HTML5 APIs was so much fun.
            </Paragraph>
            <Paragraph>
                All and all a great little concept app that turned out very
                well.
            </Paragraph>
            <AspectBox aspect="1920:1080">
                <VideoPlayer
                    playing={true}
                    autoPlay={true}
                    playerProps={{ controls: false, loop: true }}
                    url={strowVideoTick}
                />
            </AspectBox>
            <PortfolioButton link="https://strive-2.web.app/">Visit Strow</PortfolioButton>
            {/* <Link><A href="">Visit Strow</A></Link> */}
        </Box>
    </Portfolio>
);
