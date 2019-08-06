import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { relativeFontSize, baseText } from '../theme/ThemeRules';

const StyledPortfolioButton = styled.a`
    ${baseText}
    ${relativeFontSize({ relSize: 3.5, sizeMin: 20, sizeMax: 26 })};  
    ${props => {
        return `;
            padding: 20px;
            text-align: center;
            font-weight: 400;
            letter-spacing: -1.6;
            display: block;
            text-decoration: none;
            color: #333;
            cursor: pointer;
            background-color: #F4F4F4;
            border-radius: 15px;
            transition: all 0.3s;

            :hover{
                background-color: #ddd;
            }

            :active{
                background-color: #fff;                
            }
        `
    }}
`

/**
 * @usage
 * ```javascript
 *  <PortfolioButton link="https://strive.ahlgren.co">Visit Strive</PortfolioButton>
 * ```
 */
class PortfolioButton extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        link: PropTypes.string.isRequired,
    }

    render() {
        return (
            <StyledPortfolioButton {...this.props} href={this.props.link} target="_blank">
                {this.props.children}
            </StyledPortfolioButton>
        );
    }
}

export default PortfolioButton;