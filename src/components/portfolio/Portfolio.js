// @ts-check
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import styled from 'styled-components';
import { Box, AspectBox } from '../theme/ThemeComponents';
import { breakpoint } from '../theme/BaseRules';
import PortfolioShell from './PortfolioShell';
import PortfolioContentPresenter from './PortfolioContentPresenter';

const PortfolioContent = styled(Box)`
    width: 100%;
    max-width: 600px;
    padding: 30px;
    padding-bottom: 50px;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;

    ${breakpoint({
        breakpoint: {
            "width<680px": `
                max-width: 100%;
                padding: 15px;
            `
        }
    })}
`;

const PortfolioCover = styled(AspectBox)`
    cursor: pointer;

    img {
    }
`;

/**
 * @usage
 * ```javascript
 *  <Portfolio portfolioWrapper={true} cover={coverElement}>
 *      <Title>Sideview </Title>
 *      <Paragraph>Some text about sideview</Paragraph>
 *  </Portfolio>
 * ```
 */
class Portfolio extends Component {

    static defaultProps = {
        portfolioWrapper: true,
        coverAspect: '862:424'
    }

    static propTypes = {
        cover: PropTypes.element,
        portfolioWrapper: PropTypes.bool
    }

    state = {
        expanded: false
    };

    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };

    render() {

        let content = this.props.children;
        if(this.props.portfolioWrapper){
            content = <PortfolioContent>
                {content}
            </PortfolioContent>
        }

        return (
            <PortfolioShell {...this.props} open={this.state.expanded}>
                <PortfolioCover aspect={this.props.coverAspect} onClick={this.toggleExpand}>
                    {this.props.cover}
                </PortfolioCover>
                <PortfolioContentPresenter open={this.state.expanded}>
                    {this.state.expanded && content}
                </PortfolioContentPresenter>
            </PortfolioShell>
        );
    }
}



export default Portfolio;
