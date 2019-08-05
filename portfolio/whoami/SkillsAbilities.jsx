import React from 'react';
import Portfolio from '../Portfolio';
import Icon from './../../icons/Icons';
import Skills from './../../sections/Skills';

import './skills-abilities.css';

const {Page, TextSection, SectionHeader} = Portfolio;

export default props => <Page className="ah-skills-abilities">
    <TextSection fill={true} vBox={true}>
        <SectionHeader label="Strengths" />
        <Icon.Container className="ah-skills-abilities--strengths">
            <Icon.Web label="Web" />
            <Icon.Startup label="Startups" />
            <Icon.Product label="Product" />
        </Icon.Container>
    </TextSection>
    <TextSection fill={true} vBox={true} className="ah-skills-abilities--experience">
        <SectionHeader label="Experience" />
        <Skills />
    </TextSection>
    <TextSection fill={true} vBox={true}>
        <SectionHeader label="Motivation" />
        <Icon.Container className="ah-skills-abilities--motivation">
            <Icon.Humanity label="Creating Technology to Improve Humanity" />
            <Icon.Lobster label="Reaching Biological Immortality" />
        </Icon.Container>
    </TextSection>
</Page>