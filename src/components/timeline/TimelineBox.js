import React, { Component } from 'react';
import styled from 'styled-components';
import { Box } from '../theme/ThemeComponents';
import PropTypes from 'prop-types';
import { fat } from '../theme/ThemeRules';

const timelineDot = require('./timeline-dot.svg');

const StyledTimelineBox = styled(Box)`
    background-color: #fff;
    padding: 20px;

    box-shadow: 0px 2px 5px rgba(0,0,0,0.25);
`;

const OuterWrapper = styled(Box)`
    max-width: 550px;

    ${({ alignment }) => {
        switch (alignment) {
            case 'right':
                return `
                    place-self: flex-end;
                `;
                break;
            
                case 'center':
                return `
                    place-self: center;
                `
                break;

            case 'left':
            default:
                return `
                    place-self: flex-start;
                `;
                break;
        }
    }}
`;
const TimelineDot = props => (
    <img className="timeline-box--dot" src={timelineDot} />
);
const StyledTimelineDot = styled(TimelineDot)``;

const YearWrapper = styled(Box)`
    justify-content: flex-start;
    ${({ alignment }) => {
        switch (alignment) {
            case 'right':
                return `
                    flex-direction: row-reverse;
                `;
                break;

            case 'center':
                return `
                    flex-direction: row-reverse;
                    justify-content: center;
                `;
                break;

                    
            case 'left':
            default:
                return `
                    flex-direction: row;
                    justify-content: flex-start;
                `;
                break;
        }
    }}

    & > *:last-child {
        ${props => {
            if (props.alignment === 'right') {
                return 'margin-right: 7px;';
            } else {
                return 'margin-left: 7px;';
            }
        }}
    }
`;

const Year = styled.div`
    ${fat}

    font-size: 32px;
    color: #ddd;
`;

class TimelineBox extends Component {
    static defaultProps = {
        dotAlign: 'left',
    };

    static propTypes = {
        year: PropTypes.string.isRequired,
        dotAlign: PropTypes.string.isRequired,
    };

    render() {
        return (
            <OuterWrapper alignment={this.props.dotAlign}>
                <YearWrapper center row alignment={this.props.dotAlign}>
                    <StyledTimelineDot className="timeline-box--dot" />
                    <Year>{this.props.year}</Year>
                </YearWrapper>
                <StyledTimelineBox {...this.props}>{this.props.children}</StyledTimelineBox>
            </OuterWrapper>
        );
    }
}

export default TimelineBox;
