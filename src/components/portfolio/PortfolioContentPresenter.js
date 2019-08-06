import React, { Component } from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const springOut = {
    type: 'spring',
    stiffness: 100,
    damping: 1000,
    velocity: 0,
    mass: 10,
    restSpeed: 0.1
};

const springIn = {
    type: 'spring',
    stiffness: 1000,
    damping: 1000,
    velocity: 2000,
    mass: 10,
    restSpeed: 0.1
};
const PosedPortfolioContent = posed.div({
    open: {
        height: 'auto',
        transition: springOut
    },
    closed: {
        height: 0, 
        transition: springIn
    }
});

const StyledPortfolioContent = styled(PosedPortfolioContent)`
    transform-origin: top;
    overflow: hidden;
`;

class PortfolioContentPresenter extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired
    };

    static defaultProps = {
        open: false
    };

    render() {
        return (
            <StyledPortfolioContent
                pose={this.props.open ? 'open' : 'closed'}
            >
                <div>
                    {this.props.children}
                </div>
            </StyledPortfolioContent>
        );
    }
}

export default PortfolioContentPresenter;
