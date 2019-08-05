import React from 'react';
import QudiniPortfolio from '../portfolio/QudiniPortfolio';
import QuanticMindPortfolio from '../portfolio/QuanticMindPortfolio';
import {Header, Text} from '../Typography';
import {Page, InnerPage} from '../Layout';
import Portfolio from '../portfolio/PortfolioComponent';
import PortfolioComponents from '../portfolio/Portfolio';
const {OffsetSection} = PortfolioComponents;

export default class Companies extends React.Component{

    render(){
        return(
            <div className="ah-companies" style={{marginBottom:'100vh'}}>
                {/* <OffsetSection className="ah-companies--blurb" style={{margin: '0 auto 100px', maxWidth: '650px'}}>
                    <Header>Companies</Header>
                    <Text>
                        The last couple of years I've had the privlidge to work with an
                        incredible array of talented people. It was a great experience 
                        that taught me a lot.
                    </Text>    
                </OffsetSection> */}
                <Portfolio {...QuanticMindPortfolio} {...this.props} />
                <Portfolio {...QudiniPortfolio} {...this.props} />
            </div>
        )
    }
}