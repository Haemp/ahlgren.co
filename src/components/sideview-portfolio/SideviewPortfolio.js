// @ts-check
import React from 'react';
import { Box, AspectBox, A } from '../theme/ThemeComponents';
import Portfolio from '../portfolio/Portfolio';
import CoverImage from '../portfolio/CoverImage';

import styled from 'styled-components';
import { Paragraph, H1, H2, H3, Link } from '../typography/Typography';
import {
    Icon,
    IconContainer,
    ScaledIcon
} from '../icon-container/IconContainer';
import VideoPlayer from '../video-player/VideoPlayer';

import portfolioCover from './sideview-cover.png';
import customerAcquisitionStrat from './customer-acquisition-strat.png';
import PortfolioButton from '../portfolio/PortfolioButton';
import { ScaledTitle as Title } from '../theme/ScaledComponents';
import ScalingProvider from '../scaling/ScalingProvider';

const sideviewIntroVideo =
    'https://firebasestorage.googleapis.com/v0/b/sideview-ahlgren-co.appspot.com/o/v3%2Fsideview-landing-video-v2.m4v?alt=media&token=e5019edb-dcfe-488c-b456-2e12cb1e11d4';

export default props => (
    <Portfolio
        className="portfolio--sideview"
        cover={<CoverImage src={portfolioCover} />}
    >
        <Box spacing="30px" className="portfolio--inner-content">
            <Box>
                <Title center>
                    <A title="Visit Sideview.app" href="https://sideview.app">
                        Sideview
                    </A>
                </Title>
                <Paragraph center>
                    A JavaScript Component Builder to help developers work in a
                    component based workflow
                </Paragraph>
            </Box>
            <AspectBox aspect="1920:1080">
                <VideoPlayer url={sideviewIntroVideo} />
            </AspectBox>
            <H1>My Involvement</H1>
            <Paragraph>
                I was the project founder on Sideview, so apart from a handful
                of interns, I handled all development in both customer and
                engineering.
            </Paragraph>
            <IconContainer iconSize="large" iconMargin="15px">
                <ScaledIcon
                    largeIcon={true}
                    name="backend"
                    mainLabel="Backend"
                    secondaryLabel="Engineer"
                />
                <ScaledIcon
                    largeIcon={true}
                    name="frontend"
                    mainLabel="Frontend"
                    secondaryLabel="Engineer"
                />
                <ScaledIcon
                    name="ui"
                    largeIcon={true}
                    mainLabel="UI/UX"
                    secondaryLabel="Designer"
                />
                <ScaledIcon
                    name="product"
                    largeIcon={true}
                    mainLabel="Product"
                    secondaryLabel="Manager"
                />
                <ScaledIcon
                    name="customer"
                    largeIcon={true}
                    mainLabel="Customer"
                    secondaryLabel="Developer"
                />
            </IconContainer>
            <H1>How was Sideview built?</H1>
            <Paragraph>
                Sideview is at root an electron app, but since it's scope is
                quite large it is divided into many smaller libraries for
                simplicity.
            </Paragraph>
            <H2>Frontend</H2>
            <Paragraph>
                The frontend is a React application built with the help of
                Sideview itself (how's that for recursion?). It uses
                styled-components and a handful of popular libraries such as
                material-ui and react-pose.
            </Paragraph>
            <IconContainer>
                <Icon name="pose" secondaryLabel="React Pose" />
                <Icon name="material-ui" secondaryLabel="Material UI" />
                <Icon name="sketch" secondaryLabel="Sketch" />
                <Icon name="react" secondaryLabel="React" />
            </IconContainer>
            <H2>Backend</H2>
            <Paragraph>
                Sideview's backend is a beast of it's own since there are so
                many moving parts that go into building and bootstrapping js
                files. It is split into about a dozen smaller services to manage
                this complexity.
            </Paragraph>
            <H3>Builder</H3>
            <Paragraph>
                Service responsible for compiling user components, consists of a
                couple of custom webpack resolvers, a standalone process runner
                and a lot of custom heuristics to handle user supplied webpack
                configurations.
            </Paragraph>
            <IconContainer>
                <Icon name="webpack" secondaryLabel="Webpack" />
                <Icon name="ava" secondaryLabel="AVA" />
                <Icon name="firebase" secondaryLabel="Firebase" />
                <Icon name="node" secondaryLabel="Node" />
            </IconContainer>
            <H3>Componentizer</H3>
            <Paragraph>
                Responsible for creating component files from internal templates
                and organizing individual components inside the generated
                .sideview folder.
            </Paragraph>
            <H3>Inspector</H3>
            <Paragraph>
                Contains a custom babel compiler plugin for SideView's
                inspectable comments. Includes a CDP (
                <A
                    href="https://chromedevtools.github.io/devtools-protocol/"
                    target="_blank"
                >
                    Chrome Debugger Protocol
                </A>{' '}
                ) adapter that handles live manipulating of runtime variables.
            </Paragraph>
            <IconContainer>
                <Icon name="chrome" secondaryLabel="CDP" />
                <Icon name="typescript" secondaryLabel="TypeScript" />
                <Icon name="node" secondaryLabel="Node" />
            </IconContainer>
            <Paragraph>
                Other sub-projects involved: IPC Message Manager, an
                electron-builder patch for yarn workspaces, a project wide log
                manager and a customer management platform.
            </Paragraph>
            <H1>What was the customer acquisition strategy?</H1>
            <Paragraph>
                The CMS is based on a puppeteer script I developed for scraping
                twitter users. It handles automatically sending messages and
                allows me to interact with users via Twitter, to get feedback
                and handle requests.
            </Paragraph>
            <AspectBox aspect="520:202">
                <img
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    src={customerAcquisitionStrat}
                />
            </AspectBox>
            <Paragraph>
                The system automates reach-out on twitter and categorizes users
                based on their interest and engagement. The tech is fairly
                simple: A react front end and a node server backend to interact
                with the twitter automation script. And finally all the user
                statuses and messages gets serialized and saved into a mongodb
                database.
            </Paragraph>
            <IconContainer>
                <Icon name="puppeteer" secondaryLabel="Puppeteer" />
                <Icon name="mongodb" secondaryLabel="MongoDB" />
                <Icon name="react" secondaryLabel="React" />
            </IconContainer>
            <Paragraph>
                All and all I've managed about 5000 users in this system, about
                a third of which was actively involved in the development
                process by giving feedback and using the beta.
            </Paragraph>
            <H1>What was the most challenging part?</H1>
            <Paragraph>
                Sideview involves a lot of technical challenges, but by far the
                most challenging was understanding how fragmented the JavaScript
                workflows has become over the years. Building something useful
                in this space involves spending a lot of time figuring out how
                to make that workflow better, while managing the scope creep.
                That was incredibly challenging.
            </Paragraph>
            <Paragraph>
                Over the course of almost a year I spoke to literally thousands
                of front end developers and managed to find some pain points
                that Sideview solves very well.
            </Paragraph>
            {/* <A>
                Visit Sideview.app
            </A> */}
        </Box>
    </Portfolio>
);
