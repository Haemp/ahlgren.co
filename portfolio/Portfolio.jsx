import React from 'react';
import classNames from 'classnames';

import './portfolio.css';

const Page = props => <div className={classNames(props.className, 'ah-portfolio--page')}>{props.children}</div>;
const SplashPage = props => <Page className={classNames([props.className, 'ah-portfolio--splash-page'])}>
    <img className="ah-portfolio--logo" src={props.logo} />
</Page>;


const Section = props => {
    return React.Children.map(props.children, child => {
        const style = {};
        let classes = child.props.className + ' ';

        if(props.vBox){
            classes += 'ah-section--vbox ';
        }

        if(props.boxVCenter){
            classes += 'ah-section--vcenter ';
        }

        if(props.fill){
            classes += 'ah-section--fill ';
        }

        if(props.fill){
            return React.cloneElement(child, {
                style,
                ...child.props,
                className: classes
            })
        }
        return React.cloneElement(child, child.props);
    })
}

const TextSection = props => <Section {...props}>
    <div className={"ah-portfolio--text-wrapper " + props.className}>
        {props.children}
    </div>
</Section>

const InnerSection = props => <div className="ah-portfolio--inner-wrapper">
    {props.children}
</div>;

const QuoteSection = props => <Section {...props}>
    <div className={"ah-portfolio--quote-section " + props.className}>
        <InnerSection>
            {props.children}
        </InnerSection>
    </div>
</Section>

const OffsetSection = props => <Section {...props}>
    <div className={"ah-portfolio--offset-section " + props.className} style={props.style}>
        <InnerSection>
            {props.children}
        </InnerSection>
    </div>
</Section>

const ListSection = props => <div className="ah-portfolio--list-wrapper">
    <div className="ah-portfolio--list-inner-wrapper">
        {props.children}
    </div>
</div>;

const MediaSection = props => <div className="ah-portfolio--media-wrapper" style={{
    height: props.height,
    flex: props.fill ? '1' : ''
}}>
    <InnerSection>
        {props.children}
    </InnerSection>
</div>

const SectionHeader = props => <div className="ah-portfolio--section-header">
    <label className="ah-portfolio--section-header-label">{props.label}</label>
    <svg className="ah-portfolio--section-header-line" height="2px" preserveAspectRatio="none" viewBox="0 0 10 1">
        <path d="M 0 1 L 10 1" strokeWidth="1" stroke="white" />
    </svg>
</div>;

const VisitButton = props => <a target="_blank" className={classNames([props.className, 'ah-portfolio--visit-btn'])} href={props.url}>{props.children}</a>

export default {
    Page, 
    SplashPage, 
    TextSection, 
    MediaSection, 
    VisitButton, 
    ListSection,
    SectionHeader,
    OffsetSection,
    QuoteSection
};