import React from 'react';
import BigPortfolio from './BigPortfolio';
import SmallPortfolio from './SmallPortfolio';
import ClientState from '../ClientState';
import classNames from 'classnames';

export default (props) => {
    if(ClientState.getViewMode() === ClientState.MODE_SMALL){
        return <SmallPortfolio {...props} 
                               getSlides={props.getSlides} 
                               splashLogo={props.splashLogo} 
                               className={classNames([props.className, 'ah-portfolio', 'ah-portfolio--'+props.name])} />
        
    }else{
        return <BigPortfolio {...props} 
                             getSlides={props.getSlides} 
                             splashLogo={props.splashLogo} 
                             className={classNames([props.className, 'ah-portfolio', 'ah-portfolio--'+props.name])} />
    }
}