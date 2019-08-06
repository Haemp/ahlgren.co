// @ts-check
import React from 'react';
import { Box, AspectBox, Subtitle } from '../theme/ThemeComponents';
import Portfolio from '../portfolio/Portfolio';
import styled from 'styled-components';
import {
    Title,
    Paragraph,
    H1,
    H2,
    Link,
    SubTitle
} from '../typography/Typography';
import portfolioCover from './cover-qudini.png';
import { Icon, IconContainer } from '../icon-container/IconContainer';
import VideoPlayer from '../video-player/VideoPlayer';
import YoutubeVideo from '../youtube-player/YoutubePlayer';
import { List, ListItem } from '../theme/List';
import { ScaledTitle } from '../theme/ScaledComponents';
import SkillsContainer from '../skills/SkillsContainer';

const qudiniCustomerCase = 'https://www.youtube.com/embed/sjRBmc2zQ1U';
const qudiniNatWest = 'https://www.youtube.com/embed/9EfJ7UbCOf0';

const CoverImageSizer = props => {
    return (
        <Box center parentFill>
            <img
                style={{
                    width: '30%'
                }}
                src={props.cover}
            />
        </Box>
    );
};

export default props => (
    <Portfolio cover={<CoverImageSizer cover={portfolioCover} />}>
        <Box spacing="30px">
            <Box>
                <ScaledTitle center>Qudini</ScaledTitle>
                <SubTitle>
                    Qudini is a wait-list and customer experience tool - to
                    power the store of the future.
                </SubTitle>
            </Box>
            <AspectBox aspect="1920:1080">
                <iframe
                    width="100%"
                    height="100%"
                    src={qudiniCustomerCase}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </AspectBox>
            {/* <Paragraph> Seems cool, but people won't be interested in reading this
                After having a chat with the founders in their accelerator
                office at Wayra, I knew this was where I had to go. I joined as
                the first hire and was lucky enough to follow a fledgling
                startup in it's growth from office to office, turning the first
                pounds of profit and building a world class team.
            </Paragraph> */}
            <H1>Responsibilities</H1>
            <Paragraph>
                Throughout my 2 years as a frontend engineer at Qudini I got to
                do everything from writing ad-hoc IOS apps for ticket printing
                machines and hiring junior developers to developing a component
                architecture in AngularJS.
            </Paragraph>
            <SkillsContainer
                skills={['backend', 'frontend', 'ui', 'product']}
            />
            <H1>Tech</H1>
            <H2>Frontend</H2>
            {/* <Paragraph>
                I was hired at Qudini as a Senior Frontend Developer and this is
                where my first priorities lay.
            </Paragraph> */}
            <Paragraph>
                I developed about a dozen different applications for clients in
                retail, restaurant and healthcare. My main achievement here was
                to move the existing apps over to Angular and unify as much of
                the codebase as possible to help reuse across all applications.
            </Paragraph>
            <IconContainer>
                <Icon name="webpack" secondaryLabel="Webpack" />
                <Icon name="javascript" secondaryLabel="ES6" />
                <Icon name="angular" secondaryLabel="Angular" />
                <Icon name="html5" secondaryLabel="HTML 5" />
            </IconContainer>
            <H2>Backend</H2>
            <Paragraph>
                Since Qudini has always been in a growth phase - scaling was the
                main issue for the backend. This wasn't one of my
                responsibilities, but I dipped in and out of backend work when
                it was needed to keep me unblocked on the frontend.
            </Paragraph>
            <IconContainer>
                <Icon name="aws" secondaryLabel="AWS" />
                <Icon name="java" secondaryLabel="Java" />
                <Icon name="mysql" secondaryLabel="MySQL" />
            </IconContainer>
            <H2>UI/UX</H2>
            <Paragraph>
                Being the first hire of Qudini meant I had to build the UI and
                UX virtually from scratch. The challenge here was to maintain a
                consistent feel across all the applications. Since the target
                audience was not exactly tech-savvy it was also very important
                to be very obvious in the UI and to design around existing user
                expectations (even if they weren't always the best ones).
            </Paragraph>
            {/* <Paragraph>
                Qudini's restaurant
                application is a cross platform web app I developed for Qudini
                and it's still alive and well today.
            </Paragraph> */}
            <IconContainer>
                <Icon name="sketch" secondaryLabel="Sketch" />
                <Icon name="sass" secondaryLabel="SASS" />
                <Icon name="after-effects" secondaryLabel="After Effects" />
            </IconContainer>

            <H1>Mistakes and Lessons</H1>
            <Paragraph>
                One of the key takeaways from my experience at Qudini is a more
                healthy attitude towards technical debt. I spent far too much
                time worrying about technical details that in the end had a very
                limited impact on the customer experience.
            </Paragraph>
            <Paragraph>
                The lesson here being that what we as engineers are here to do
                is first and foremost to build something great for our
                customers. Focusing too much on things like unit test coverage
                numbers or "future-proofing" often sacrifices time that
                could be spent improving the user journey.
            </Paragraph>
            <H1>Achievements</H1>
            <List>
                <ListItem>
                    Built and deployed a restaurant wait list application based
                    on HTML5 (AngularJS) running as a hybrid app in many popular
                    restaurants (Honest Burgers, The Diner, Burger and Lobster) in London.
                </ListItem>
                <ListItem>
                    Architected and maintained a very large (500K lines of code)
                    frontend codebase, while still delivering continual user
                    improvements.
                </ListItem>
                <ListItem>
                    Designed and implemented a unified UI across a dozen
                    applications.
                </ListItem>
                <ListItem>
                    Helped interviewing, screen and test new developers to build
                    a great working team.
                </ListItem>
            </List>
            <AspectBox aspect="1920:1080">
                <iframe
                    width="100%"
                    height="100%"
                    src={qudiniNatWest}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </AspectBox>

            {/* <H1>Technology</H1>
            <Paragraph>
                When I started at qudini I quickly realized that jquery +
                backbone would not cut it. I decided to go with AngularJS then
                and I've never looked back. The main technologies included in
                Qudini's front end is:
            </Paragraph>
            <IconContainer>
                <Icon name="webpack" secondaryLabel="Webpack" />
                <Icon name="javascript" secondaryLabel="ES6" />
                <Icon name="angular" secondaryLabel="Angular" />
                <Icon name="html5" secondaryLabel="HTML 5" />
                <Icon name="sass" secondaryLabel="SASS" />
                <Icon name="sketch" secondaryLabel="Sketch" />
                <Icon name="java" secondaryLabel="Java" />
            </IconContainer> */}
            <H1>Thanks Qudini!</H1>
            <Paragraph>
                It might sound sappy but Qudini made me the developer I am
                today. Learning and growing side by side with a group of
                extremely talented people was a great adventure.
            </Paragraph>
            {/* <Paragraph>
                On the tech side being forced to make architectural decisions
                while still delivering at a high pace was not always easy - but
                man did I learn a lot!
            </Paragraph> */}
            {/* <Link href="https://qudini.com">Visit Qudini.com</Link> */}
        </Box>
    </Portfolio>
);
