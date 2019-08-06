// @ts-check
import React from 'react';
import { Box, AspectBox } from '../theme/ThemeComponents';
import Portfolio from '../portfolio/Portfolio';
import styled from 'styled-components';
import { Title, Paragraph, H1, H2, Link } from '../typography/Typography';
import portfolioCover from './cover-shappy.png';

import { Icon, IconContainer } from '../icon-container/IconContainer';
import VideoPlayer from '../video-player/VideoPlayer';
import YoutubeVideo from '../youtube-player/YoutubePlayer';
import { ScaledTitle } from '../theme/ScaledComponents';
import PortfolioButton from '../portfolio/PortfolioButton';
const shappyCooperDrop =
    'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fshappy-video2.mp4?alt=media&token=e014e1f8-74c2-41ac-8a1c-ee63e6cea50b';
const shappyVideoTitle =
    'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fshappy-video-title.mp4?alt=media&token=4e0fda13-833b-4ee0-8217-1be9624f259a';
const shappyVideoCreate =
    'https://firebasestorage.googleapis.com/v0/b/ahlgren-co.appspot.com/o/videos%2Fshappy-video-create.mp4?alt=media&token=4ab1fab1-a16f-458b-8deb-bad13f26b4cd';

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
                <ScaledTitle center>Shappy</ScaledTitle>
                <Paragraph>
                    Shappy is a cross platform desktop application for file sharing.
                </Paragraph>
            </Box>
            <Paragraph>
                It is based on open standard WebRTC technology behind the
                scenes. The goal with Shappy was to make sharing any file on
                your computer as simple as sharing a URL. It has an incredibly
                simple and intuitive interface to make sharing files
                ridonculously simple.
            </Paragraph>
            <IconContainer largeIcon={true} iconMargins="30px">
                <Icon
                    largeIcon={true}
                    rSize={0.9}
                    name="backend"
                    mainLabel="Backend"
                    secondaryLabel="Engineer"
                />
                <Icon
                    largeIcon={true}
                    rSize={0.9}
                    name="frontend"
                    mainLabel="Frontend"
                    secondaryLabel="Engineer"
                />
                <Icon
                    name="ui"
                    rSize={0.9}
                    mainLabel="UI/UX"
                    secondaryLabel="Designer"
                />
                <Icon
                    largeIcon={true}
                    rSize={0.9}
                    name="product"
                    mainLabel="Product"
                    secondaryLabel="Manager"
                />
                <Icon
                    largeIcon={true}
                    rSize={0.9}
                    name="customer"
                    mainLabel="Customer"
                    secondaryLabel="Developer"
                />
            </IconContainer>

            <H1>How it works</H1>
            <Paragraph>
                All you need to do is install shappy on your Mac or Windows
                machine. Then just drag the file you want to share over the
                little bird icon in the task bar.
            </Paragraph>
            <Paragraph>
                Shappy then creates a URL that works from any browser.
            </Paragraph>
            <Paragraph>
                The file is shared directly from the computer so there is no
                need to upload anything and no need to trust third party
                servers.
            </Paragraph>
            <AspectBox aspect="1920:1080">
                <VideoPlayer
                    playing={true}
                    autoPlay={true}
                    playerProps={{ controls: false, loop: true }}
                    url={shappyCooperDrop}
                />
            </AspectBox>

            <H1>Tools and Tech</H1>
            <Paragraph>
                Shappy is an Electron app with some native extensions added to
                handle deeper integration with the target OS.
            </Paragraph>
            <IconContainer>
                <Icon name="node" secondaryLabel="Node" />
                <Icon name="web-rtc" secondaryLabel="WebRTC" />
                <Icon name="javascript" secondaryLabel="ES6" />
                <Icon name="electron" secondaryLabel="Electron" />
                <Icon name="sketch" secondaryLabel="Sketch" />
            </IconContainer>
            <H1>WebRTC</H1>
            <Paragraph>
                To simplify the client setup for WebRTC I use a library called
                PeerJs. I then also need a signaling server working over a
                secure port. For this I used a basic node socket server - hosted
                on google compute engine.
            </Paragraph>
            <IconContainer>
                <Icon name="google-compute-engine" secondaryLabel="GCE" />
                <Icon name="google-cloud-functions" secondaryLabel="GCF" />
                <Icon name="google-sql" secondaryLabel="GSQL" />
            </IconContainer>
            <Paragraph>
                To manage the links to the shared files I'm using Google cloud
                functions and Google Cloud SQL (yay serverless!)
            </Paragraph>
            <Paragraph>
                For this project I'm also using two different micro node
                services to handle emaling users and uploading the install files
                to google drive where they are hosted. #AutomateEVERYTHING!
            </Paragraph>
            <AspectBox aspect="1920:1080">
                <VideoPlayer
                    playing={true}
                    autoPlay={true}
                    playerProps={{ controls: false, loop: true }}
                    url={shappyVideoTitle}
                />
            </AspectBox>
            <H1>Truly fullstack</H1>
            <Paragraph>
                Building Shappy took me all over the place - from debugging
                desktop applications on windows to debugging RTC network traffic
                over wireshark, creating many small node services and also
                designing the look and feel of the app.
            </Paragraph>
            <Paragraph>All great fun!</Paragraph>

            {/* <Link href="https://shappy.ahlgren.co">
                Visit shappy.ahlgren.com
            </Link> */}

            <PortfolioButton link="https://shappy.web.app">Visit Shappy</PortfolioButton>
        </Box>
    </Portfolio>
);
