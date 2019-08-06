import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fat } from '../theme/ThemeRules';

const StyledPortfolioButton = styled.a`
    ${fat}
    ${props => {
        return `
            border-radius: 100px;
            padding: 20px;
            text-align: center;
            letter-spacing: .3;
            display: block;
            font-size: 24px;
            text-transform: uppercase;
            cursor: pointer;
            color: ${props.textColor};
            background: linear-gradient(${props.rotation}, ${props.startGrad}, ${props.endGrad});
        `
    }}
`

/**
 * @usage
 * ```javascript
 * <PortfolioButton startGrad endGrad text link>Visit Strive</PortfolioButton>
 * ```
 */
class PortfolioButton extends Component {

    static propTypes = {
        startGrad: PropTypes.string.isRequired,
        rotation: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
        endGrad: PropTypes.string.isRequired,
        children: PropTypes.element.isRequired,
        link: PropTypes.string.isRequired,
    }

    render() {
        return (
            <StyledPortfolioButton {...this.props}>
                {this.props.children}
            </StyledPortfolioButton>
        );
    }
}

export default PortfolioButton;