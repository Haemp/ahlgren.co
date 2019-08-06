// @ts-check
import React from 'react';
import { Box, AspectBox } from '../theme/ThemeComponents';
import Portfolio from '../portfolio/Portfolio';
import styled from 'styled-components';
import { Title, Paragraph, H1, H2, Link } from '../typography/Typography';
import portfolioCover from './cover-quantic-mind.png';

import { Icon, IconContainer } from '../icon-container/IconContainer';
import VideoPlayer from '../video-player/VideoPlayer';
import YoutubeVideo from '../youtube-player/YoutubePlayer';
import { List, ListItem } from '../theme/List';
import { ScaledTitle } from '../theme/ScaledComponents';
import PortfolioButton from '../portfolio/PortfolioButton';

const overviewVideo =
    '//play.vidyard.com/BkqirbHdF6W2gW6dmW4QhA.html?v=3.1.1&autoplay=0';
const customerVideo =
    '//play.vidyard.com/iJm2VwDcmZsf7aqg7wZhKD.html?v=3.1.1&autoplay=0';

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
                <ScaledTitle center>QuanticMind</ScaledTitle>
                <Paragraph>
                    Based in San Francisco, QuanticMind helps it's customers to
                    optimise their digital ads. QM enables customers to have a
                    unified dashboard for interacting with ads across
                    ad-networks and uses machine learning to optimize bids.
                </Paragraph>
            </Box>
            <AspectBox aspect="1920:1080">
                <iframe
                    className="vidyard_iframe"
                    src={overviewVideo}
                    width="100%"
                    height="100%"
                    scrolling="no"
                    frameBorder="0"
                    allowtransparency="true"
                    allowFullScreen
                />
            </AspectBox>

            <H1>Responsibilities</H1>
            <Paragraph>
                At QuanticMind I was privileged to work with a lot of incredibly
                smart people from all over the world. I not only made a lot of
                new friends but learned a lot under a very dynamic leadership.
            </Paragraph>
            <IconContainer>
                <Icon
                    name="backend"
                    rSize={0.9}
                    mainLabel="Backend"
                    secondaryLabel="Engineer"
                />
                <Icon
                    name="frontend"
                    rSize={0.9}
                    mainLabel="Frontend"
                    secondaryLabel="Engineer"
                />
                <Icon
                    name="ui"
                    rSize={0.9}
                    mainLabel="UI/UX"
                    secondaryLabel="Designer"
                />
            </IconContainer>
            <H1>Achievements</H1>
            <Paragraph>
                I'm very happy with the results of my two years at QuanticMind.
                Silicon Valley often works at a breakneck pace but the positive
                of that is that you get a lot done.
            </Paragraph>
            <List>
                <ListItem>
                    Started as Senior Frontend Engineer but eventually dropped
                    the frontend title as I the company went more
                    cross-functional
                </ListItem>
                <ListItem>
                    Oversee both UX and UI design and implementation for
                    greenfield projects
                </ListItem>
                <ListItem>
                    Help create and steer platform architecture for Frontend and
                    QA
                </ListItem>
                <ListItem>
                    Responsible for upgrading a massive legacy codebase
                </ListItem>
            </List>
            <AspectBox aspect="1920:1080">
                <iframe
                    className="vidyard_iframe"
                    src={customerVideo}
                    width="100%"
                    height="100%"
                    scrolling="no"
                    frameBorder="0"
                    allowtransparency="true"
                    allowFullScreen
                />
            </AspectBox>
            <H1>Technology</H1>
            <Paragraph>
                Over the years I worked at QuanticMind I touched on many tech
                stacks and tools, these are among the most prevalent:
            </Paragraph>
            <IconContainer>
                <Icon name="webpack" secondaryLabel="Webpack" />
                <Icon name="node" secondaryLabel="AVA" />
                <Icon name="javascript" secondaryLabel="ES6" />
                <Icon name="angular" secondaryLabel="Angular" />
                <Icon name="java" secondaryLabel="Java" />
                <Icon name="aws" secondaryLabel="AWS" />
                <Icon name="docker" secondaryLabel="Docker" />
                <Icon name="sass" secondaryLabel="SASS" />
                <Icon name="sketch" secondaryLabel="Sketchh" />
                <Icon name="html5" secondaryLabel="HTML 5" />
            </IconContainer>
            <H1>Lessons Learned</H1>
            <Paragraph>
                I learned a lot working at QuanticMind so this is my ham-fisted
                attempt at a summary:
            </Paragraph>
            <List>
                <ListItem>
                    Tools can make you or break you. Bad tooling is very often
                    responsible for a significantly lower output by developers
                </ListItem>
                <ListItem>
                    Code is how we get the product, it is not an end in itself.
                </ListItem>
                <ListItem>
                    New technology should help developers by allowing them to
                    simplify, not just by adding features.
                </ListItem>
            </List>
            {/* <Link href="https://quanticmind.com">Visit QuanticMind.com</Link> */}
            <PortfolioButton link="https://quanticmind.com">
                Visit QuanticMind
            </PortfolioButton>
        </Box>
    </Portfolio>
);
