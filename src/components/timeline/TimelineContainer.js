import React, { Component } from 'react';
import TimelineBox from './TimelineBox';
import { H1 } from '../typography/Typography';
import { Paragraph, Box, A } from '../theme/ThemeComponents';
import { Icon } from '../icon-container/IconContainer';
import ReactDOM from 'react-dom';
import DynamicTimeline from './DynamicTimeline';
import styled from 'styled-components';
import { baseText, paragraph, relativeFontSize } from '../theme/ThemeRules';
import { relativeSize } from '../theme/relativeSize';

const IconWrapper = styled(Box)`
    width: 50px;
`;

const IconListText = styled.div`
    ${paragraph}
    ${relativeSize('font-size', 2.5, 17, 20)}

    flex: 1;
    width: 0;
`;

const IconListItem = props => {
    return (
        <Box row spacing="10px" alignItems="flex-start">
            <IconWrapper>
                <Icon defaultHeight={true} size="30px" name={props.icon} />
            </IconWrapper>
            <IconListText>{props.description}</IconListText>
        </Box>
    );
};

const StyledDynamicTimeline = styled(DynamicTimeline)`
    position: absolute;
    z-index: -1;
`;

const StyledTimelineContainer = styled(Box)`
    position: relative;
    padding-bottom: 50px;
`;

const TimelineParagraph = styled(Paragraph)`
    ${relativeFontSize({ relSize: 3, sizeMin: 18, sizeMax: 24 })};  
`

class TimelineContainer extends Component {
    state = {
        timelineConfig: null
    };

    componentDidMount() {
        this.gatherAllTimelineDots();

        window.addEventListener('resize', () => {
            this.gatherAllTimelineDots();
        });
    }

    async gatherAllTimelineDots() {
        const el = ReactDOM.findDOMNode(this);
        const bounding = el.getBoundingClientRect();
        const distanceFromTop = bounding.y;
        const distanceFromLeft = bounding.x;

        // get all images
        const allDots = [...el.querySelectorAll('.timeline-box--dot')];

        // make sure they're loaded in
        const allDotsLoaded = await Promise.all(
            allDots.map(dotImageEl => {
                return new Promise(res => {
                    // dots not loaded in won't have a width set
                    if (dotImageEl.getBoundingClientRect().width !== 0) {
                        res(dotImageEl);
                    } else {
                        dotImageEl.addEventListener('load', () => {
                            res(dotImageEl);
                        });
                    }
                });
            })
        );

        // get their position
        const allDotPositions = allDotsLoaded.map(dotEl => {
            // the bounds coming from this method will be relative
            // to the main window.
            // we need to make them relative to the parent container.
            const bounds = dotEl.getBoundingClientRect();
            return {
                x: bounds.x - distanceFromLeft + bounds.width / 2,
                y: bounds.y - distanceFromTop + bounds.height / 2
            };
        });

        this.setState({
            timelineConfig: {
                height: bounding.height,
                width: bounding.width,
                points: allDotPositions
            }
        });
    }

    render() {
        const { timelineConfig } = this.state;
        return (
            <StyledTimelineContainer spacing="200px">
                {timelineConfig && (
                    <StyledDynamicTimeline
                        height={timelineConfig.height}
                        width={timelineConfig.width}
                        points={timelineConfig.points}
                    />
                )}
                <TimelineBox spacing="20px" dotAlign="left" year="2003">
                    <Box>
                        <H1>#First</H1>
                        <TimelineParagraph>
                            Wrote my first public personal website. It's a
                            complete disaster and can sadly still be accessed
                            through the{' '}
                            <A
                                href="https://web.archive.org/web/20050206053125/http://www.tjock.tk/"
                                target="_blank"
                            >
                                way back machine
                            </A>
                            . Note the footer at the bottom says "Only works in
                            IE4 or above". You have been warned.
                        </TimelineParagraph>
                    </Box>
                    <Box spacing="5px">
                        <IconListItem
                            icon="notepad"
                            description="NotePad.exe - the editor of choice"
                        />
                        <IconListItem
                            icon="ie"
                            description="IE6 was the hot stuff"
                        />
                        <IconListItem
                            icon="validators"
                            description="Web design was all about validation ;)"
                        />
                    </Box>
                </TimelineBox>

                <TimelineBox spacing="20px" dotAlign="right" year="2007">
                    <Box>
                        <H1>Wait, you can make money from this?</H1>
                        <TimelineParagraph>
                            My first ever paycheck for web design work. The
                            website was pure PHP and HTML. I spent about half of
                            the project time trying to get transparent PNGs to
                            work in IE6 😭.
                        </TimelineParagraph>
                    </Box>
                    <Box spacing="5px">
                        <IconListItem
                            icon="dream-weaver"
                            description="Upgraded to Dream Weaver because of this thing called 'Syntax Highlighting'"
                        />
                        <IconListItem
                            icon="firefox"
                            description="Started using firefox and thus started a life long hatred of IE6 support."
                        />
                    </Box>
                </TimelineBox>

                <TimelineBox spacing="20px" dotAlign="left" year="2008">
                    <Box>
                        <H1>Started Ahlgren.co</H1>
                        <TimelineParagraph>
                            Started doing fullstack projects for businesses.
                            Most of my work was presentational websites and the
                            technology involved PHP (CodeIgniter) on the backend
                            and JavaScript (jQuery) on the frontend.
                        </TimelineParagraph>
                    </Box>
                    <Box spacing="5px">
                        <IconListItem
                            icon="php"
                            description="My favorite PHP framework was CodeIgniter <3"
                        />
                        <IconListItem
                            icon="mysql"
                            description="The worst interview question I ever was was to describe the difference between a left inner join and a regular join"
                        />
                    </Box>
                </TimelineBox>

                <TimelineBox spacing="20px" dotAlign="right" year="2012">
                    <Box>
                        <H1>Started Photic.me</H1>
                        <TimelineParagraph>
                            Started my first tech startup Photic.me. A site for
                            photographers to get constructive feedback.
                        </TimelineParagraph>
                    </Box>
                    <Box spacing="5px">
                        <IconListItem
                            icon="wamp"
                            description="Used the traditional WAMP stack "
                        />
                        <IconListItem
                            icon="customer"
                            description='My first try at building tools and practices for product development. Today we call it "growth hacking" back then it was just called "Customer Development"'
                        />
                        <IconListItem
                            icon="jquery"
                            description="This was the last project in which I used jQuery - so long old friend!"
                        />
                    </Box>
                </TimelineBox>
                <TimelineBox spacing="20px" dotAlign="left" year="2013">
                    <Box>
                        <H1>Joined Qudini.com</H1>
                        <TimelineParagraph>
                            Started as the first employee at the coolest startup
                            in London. Loved working here and two years later
                            the company was profitable and a lot bigger!
                        </TimelineParagraph>
                    </Box>
                    <Box spacing="5px">
                        <IconListItem
                            icon="angular"
                            description="Angular was the new hotness. I used it to develop a dozen different applications inside Qudini. Most of them are still alive and kicking to this day!"
                        />
                        <IconListItem
                            icon="sass"
                            description="SASS was a breath of fresh air into style management"
                        />
                        <IconListItem
                            icon="product"
                            description="Built Qudini's restaurant wait-list still in use in many restaurants in London today."
                        />
                    </Box>
                </TimelineBox>
                <TimelineBox spacing="20px" dotAlign="right" year="2015">
                    <Box>
                        <H1>Off to San Francisco!</H1>
                        <TimelineParagraph>
                            I had a great time at Qudini, but I always wanted to
                            work in Silicon Valley. So I went all in, bought a
                            one way ticket to San Francisco and managed to find
                            a great company by the name of QuanticMind.
                        </TimelineParagraph>
                    </Box>
                    <Box spacing="5px">
                        <IconListItem
                            icon="webpack"
                            description="Webpack has completely taken over the frontend world."
                        />
                        <IconListItem
                            icon="node"
                            description="I started doing a lot more backend JavaScript."
                        />
                        <IconListItem
                            icon="typescript"
                            description="Types... in JavaScript? Are you sure?"
                        />
                    </Box>
                </TimelineBox>
                <TimelineBox spacing="20px" dotAlign="left" year="2018">
                    <Box>
                        <H1>Started Sideview.app</H1>
                        <TimelineParagraph>
                            Having worked in frontend for a decade and seeing
                            the difference great tooling can have on developer
                            productivity, I started Sideview as a simpler way to
                            work efficiently in JavaScript.
                        </TimelineParagraph>
                    </Box>

                    <Box spacing="5px">
                        <IconListItem
                            icon="product"
                            description="Working on Sideview is great because it involves me taking product decisions from idea to customer"
                        />
                        <IconListItem
                            icon="customer"
                            description="Customer development is incredibly fun in this context"
                        />
                        <IconListItem
                            icon="ui"
                            description="And still allowing me to work on developing great user experiences"
                        />
                    </Box>
                </TimelineBox>

                <TimelineBox dotAlign="right" year="2019">
                    <Box>
                        <H1>Next Adventure!</H1>
                        <TimelineParagraph>
                            I'm really looking forward to my next opportunity
                            and this time I'm eyeing BioTech as the most
                            interesting field to contribute to.
                        </TimelineParagraph>
                    </Box>
                </TimelineBox>
            </StyledTimelineContainer>
        );
    }
}

export default TimelineContainer;
