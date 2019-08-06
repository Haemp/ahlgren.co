import React, { Component } from 'react';
import posed from 'react-pose';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import { shadowDetails } from '../theme/ThemeRules';


const sizeMax = 1.02;
const sizeMin = 0.98;

const PosedBounceBox = posed.div({
    rested: {
        boxShadow: shadowDetails.base,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10,
            restDelta: 0.1,
        }
    },
    depressed: {
        boxShadow: shadowDetails.depressed,
        scale: sizeMin,
        y: 2,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10,
            restDelta: 0.1,
        }
    },
    open: {

    },
    closed: {

    },
    floating: {
        boxShadow: shadowDetails.raised,
        scale: sizeMax,
        transition: {
            type: 'spring',
            stiffness: 400,
            restDelta: 0.1,
            damping: 10,
        }
    }
});

const StyledBounceBox = styled(PosedBounceBox)`

    border-radius: 16px;
    overflow:hidden;

    ${props => {
        if (props.pose === 'floating') {
            // return css`
            //     animation: ${floatingAnimation} 2.5s 0.8s infinite
            //         alternate-reverse linear;
            // `;
        }
    }}

    border-radius: 8px;
`;
/**
 * @description
 *
 * Desktop
 * - hover: floating state
 * - mouse down: depressed state
 * - mouse up: bouncy state
 *
 * Touch Device
 * - press: depressed state
 * - release: bouncy state
 */
class BounceBox extends Component {

    static propTypes = {
        open: PropTypes.bool
    }

    state = {
        pose: 'rested'
    };

    onPress = () => {};
    onPressUp = () => {};

    onMouseOver = () => {

        if(this.props.open){ return }

        this.setState({
            pose: 'floating'
        });
    
    };

    onMouseOut = () => {
        if(this.props.open){ return }
        this.setState({
            pose: 'rested'
        });
    };

    onMouseDown = () => {

        if(this.props.open){ return }
        this.setState({
            pose: 'depressed'
        });
    };

    onMouseUp = () => {

        if(this.props.open){ return }
        this.setState({
            pose: 'rested'
        });
    };

    onTouchEnd = () => {
        if(this.props.open){ return }
        this.setState({
            pose: 'rested'
        });
    };

    onTouchStart = () => {
        if(this.props.open){ return }
        this.setState({
            pose: 'depressed'
        });
    };

    render() {
        return (
            <StyledBounceBox
                pose={this.state.pose}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
                {...this.props}
            >
                {this.props.children}
            </StyledBounceBox>
        );
    }
}

export default BounceBox;
