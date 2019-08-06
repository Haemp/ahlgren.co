import React, { Component } from 'react';
import Timeline from '../timeline/Timeline';
import styled from 'styled-components';
import { Title, H1 } from '../typography/Typography';
import { Paragraph, Box } from '../theme/ThemeComponents';
import { shadow } from '../theme/ThemeRules';
import Portfolio from '../portfolio/Portfolio';
import { Icon } from '../icon-container/IconContainer';
import TimelineContainer from '../timeline/TimelineContainer';
import { breakpoint } from '../theme/BaseRules';
import Breakpoints from '../Breakpoints';
import { ScaledTitle } from '../theme/ScaledComponents';

const photoMe = require('./photo-me.png');

const StyledAboutMe = styled(Portfolio)``;
const StyledTimeline = styled(Timeline)`
    position: relative;
    top: -122px;
    z-index: -1;
    margin: 0 auto;
    width: 85%;
    max-width: 700px;
`;

const MeImage = styled.img`
    width: 210px;
`;

const TimelineWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
`;

const AboutMeBox = props => {
    const content = (
        <Box
            width="600px"
            breakpoint={{
                'width<500px': 'flex-direction: column;'
            }}
            row
            center
            spacing="20px"
        >
            <MeImage className="about-me--portrait" src={photoMe} />
            <Box>
                <ScaledTitle >Who am I?</ScaledTitle>
                <Paragraph>
                    Thats me, and this is a list of things I've done in the last 15 years. 
                </Paragraph>
            </Box>
        </Box>
    );

    return (
        <>
            <Breakpoints conditions={['0 < width < 500']}>
                <Box
                    row
                    center
                    padding="30px"
                    {...props}
                    className="AboutMeBox"
                >
                    {content}
                </Box>
            </Breakpoints>
            <Breakpoints conditions={['500 < width < 99999']}>
                <Box row center parentFill {...props} className="AboutMeBox">
                    {content}
                </Box>
            </Breakpoints>
        </>
    );
};

const StyledAboutMeBox = styled(AboutMeBox)`
    ${breakpoint({
        'width<500px': 'flex-direction: column;'
    })}
`;

const StyledPortraitList = styled.svg`
    position: absolute;
    top: -100px;
    z-index: -1;
`

const PortraitLine = props => {
    return '';
    return <StyledPortraitList viewBox="0 0 50 50" height="100px" width="100px">
        <path
            stroke="#D0D0D0"
            vectorEffect="non-scaling-stroke"
            strokeWidth="8px"
            d={"M 10 50 C 0 0 50 0 50 0"}
            fill="transparent"
        />
    </StyledPortraitList>;
};

class AboutMe extends Component {
    render() {
        return (
            <>
                <Breakpoints conditions={['0 < width < 500']}>
                    <StyledAboutMe
                        portfolioWrapper={false}
                        coverAspect={false}
                        cover={<StyledAboutMeBox />}
                    >
                        <TimelineWrapper>
                            <PortraitLine />
                            <TimelineContainer />
                        </TimelineWrapper>
                    </StyledAboutMe>
                </Breakpoints>
                <Breakpoints conditions={['500 < width < 999999']}>
                    <StyledAboutMe
                        portfolioWrapper={false}
                        cover={<StyledAboutMeBox />}
                    >
                        <TimelineWrapper>
                            <PortraitLine />
                            <TimelineContainer />
                        </TimelineWrapper>
                    </StyledAboutMe>
                </Breakpoints>
            </>
        );
    }
}

export default AboutMe;
