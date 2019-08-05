import React from 'react';
import StrowPortfolio from '../portfolio/StrowPortfolio';
import SideViewPortfolio from '../portfolio/SideViewPortfolio';
import ShappyPortfolio from '../portfolio/ShappyPortfolio';
import Portfolio from '../portfolio/PortfolioComponent';

export default class Projects extends React.Component{

    render(){
        return(
            <div className="ah-ahlgren--projects" style={{marginBottom:'100vh'}}>
                <Portfolio {...StrowPortfolio} {...this.props} />
                <Portfolio  {...SideViewPortfolio} {...this.props} />
                <Portfolio {...ShappyPortfolio} {...this.props} />
            </div>
        )
    }
}