// @ts-check
import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Box } from './components/theme/ThemeComponents';
import SideviewPortfolio from './components/sideview-portfolio/SideviewPortfolio';
import QuanticMindPortfolio from './components/quantic-mind-portfolio/QuanticMindPortfolio';
import StrowPortfolio from './components/strow-portfolio/StrowPortfolio';
import QudiniPortfolio from './components/qudini-portfolio/QudiniPortfolio';
import ShappyPortfolio from './components/shappy-portfolio/ShappyPortfolio';
import AboutMe from './components/about-me/AboutMe';
import VideoPlayer from './components/video-player/VideoPlayer';
import Skills from './components/skills/Skills';
import LetsTalk from './components/lets-talk/LetsTalk';
 
const introVideo = require('file-loader!../assets/intro-video-v1.3.4-a.m4v');

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }
`;

const StyledVideoPlayer = styled(VideoPlayer)`
    max-width: 900px;
    max-height: 100vh;
`;

const IntroVideoWrapper = styled(Box)`
    height: 90vh;
`;

const StyledAhlgren = styled(Box)`
    padding-bottom: 100px;
`;

const CardContainer = styled(Box)`
    padding: 0px 30px;
    box-sizing: border-box;
    max-width: 900px;

    > * {
        width: 100%;
    }
`;

console.log(`
    Snooping around for the source eh? 🤓 

    Here have a look at the repo instead: https://github.com/Haemp/ahlgren.co
    That should be a lot easier to read 😊👌.
`)

class AhlgrenMain extends Component {
    render() {
        return (
            <StyledAhlgren center spacing="100px">
                <GlobalStyle />
                <IntroVideoWrapper center>
                    <StyledVideoPlayer
                        spinnerProps={{
                            color: '#63ADDE'
                        }}
                        showReplay={false}
                        playerProps={{
                            autoPlay: true,
                            controls: false
                        }}
                        url={introVideo}
                    />
                </IntroVideoWrapper>

                <CardContainer
                    breakpoint={{
                        'width<400px': 'padding: 0 10px'
                    }}
                    spacing="100px"
                    center
                    width="100%"
                >
                    <SideviewPortfolio />
                    <QuanticMindPortfolio />
                    <StrowPortfolio />
                    <QudiniPortfolio />
                    <ShappyPortfolio />
                    <Skills />
                    <AboutMe />
                    <LetsTalk />
                </CardContainer>
            </StyledAhlgren>
        );
    }
}

export default AhlgrenMain;
