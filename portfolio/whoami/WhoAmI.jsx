import React from 'react';
import logoAhlgren from './../../icons/icon-ahlgren.svg';
import logoQudini from './../../logos/logo-qudini.png';
import logoQuanticMind from './../../logos/logo-quantic-mind.png';

import imgHampus from './image-hampus.jpg';
import imgEntrepreneur from './image-entrepreneur.jpg';
import imgMoonNight from './image-moon-night.jpg';

import Image from '../../cropper/Image';
import Cropper from '../../cropper/Cropper';
import TechIcon from '../../tech-icons/TechIcon';
import Icon from '../../icons/Icons';

import './whoami.css';

import Portfolio from './../Portfolio';
import SkillsAbilities from './SkillsAbilities';
const {
    SplashPage, 
    Page, 
    MediaSection, 
    TextSection, 
    QuoteSection,
    OffsetSection
} = Portfolio; 

const WhoAmIPortfolio = {
    name: 'whoami',
    splashLogo: logoAhlgren,
    getSlides: () => {
        const slides = <div>
            <Page>
                <MediaSection fill={true}>
                    <Image src={imgHampus} effect="zoom" />
                </MediaSection>
                <TextSection>
                    <h1>This is me.</h1>
                    <p>
                        Since I wrote my first website 15 years ago I've Designed, Developed 
                        and Lead projects with a multitude of platforms, domains and people. 
                    </p>
                    <p>
                        I thrive in an environment of change that requires quick learning and 
                        the ability to focus. My favorite quote from the tech industry is:
                    </p>
                </TextSection>
                <QuoteSection>
                    "Real Artists Ship"
                </QuoteSection>
            </Page>
            <SkillsAbilities />
            <Page>
                <TextSection>
                    <h1>The Start</h1>
                    <p>
                        I started my career as a full-stack developer, building websites in 
                        frameworks like Wordpress and Drupal. 
                    </p>
                    <p>
                        I built websites for security firms, local department stores and online 
                        game communities. Cutting my teeth in the good old fashioned LAMP stack.
                    </p>
                </TextSection>
                <TechIcon.Container>
                    <TechIcon.Wordpress />
                    <TechIcon.CodeIgniter />
                    <TechIcon.DreamWeaver />
                </TechIcon.Container>
                <TextSection>
                    <p>
                        The work here wasn’t glamourous or technically challenging but it was a 
                        great way to learn how a basic tech-stack works and how to not only build 
                        but also - how to Ship.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <Image src={imgEntrepreneur} effect="zoom" />
                </MediaSection>
                <TextSection>
                    <h1>Entrepreneurship</h1>
                    <p>
                        I've always found the front end and design parts the most rewarding part 
                        and that is where I decided I wanted to focus my career. 
                    </p>
                    <p>
                        I did this my developing my own Single Page application which came in many 
                        forms everything from an online workout diary buit in Flex to a photography 
                        feedback community built on CodeIgniter and HTML5.
                    </p>
                    <p>
                        I also started to learn about product development and more importantly - 
                        customer development.
                    </p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <Image src={logoQudini} effect="zoom" size="none" backgroundCSS={{backgroundColor: '#bf3942'}} />
                </MediaSection>
                <TextSection>
                    <h1>London Startups</h1>
                    <p>
                        In 2013 I got lucky and found a startup that was a perfect fit for me - 
                        Qudini. During the 2 years I was there I not only developed a handful 
                        of applications as the Lead front end engineer but was also instrumental 
                        to hiring and product decisions. 
                    </p>
                    <p>
                        In 2015 I decided to take the plunge and play with the big boys - I decided 
                        I needed to go to Silicon Valley so see what all the fuss was about. 
                    </p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <Image src={logoQuanticMind} effect="zoom" size="none" backgroundCSS={{backgroundImage: 'linear-gradient(45deg, #00580F, #037AE0)'}} />
                </MediaSection>
                <TextSection>
                    <h1>Silicon Valley</h1>
                    <p>
                        I Started work for QuanticMind as a Senior Frontend Engineer but also worked 
                        very closely with designers to develop a great user experience. 
                    </p>
                    <p>
                        I joined QuanticMind as the 25th employee and left 2 years later when we were 
                        +100 strong. I learned a lot about how to develop at scale - in technology as 
                        well as in building a team. I'm very happy to have worked with such an amazing 
                        team of incredibly smart people
                    </p>
                </TextSection>
            </Page>
            <Page>
                <MediaSection fill={true}>
                    <Image src={imgMoonNight} effect="zoom" />
                </MediaSection>
                <TextSection>
                    <h1>The Future</h1>
                    <p>
                        In any future position I will be looking for product management responsibilities 
                        that still will allow me to make high level technical decisions. I'm also getting 
                        more and more interested in the BioTech sector with all the potential of being 
                        a great aid to human progress.
                    </p>
                    <p>
                        If you'd like to work with me or hell - just looking to geek out over technology 
                        - just ping me on any of the following:
                    </p>
                </TextSection>
                <OffsetSection>
                    <ul className="ah-whoami--contact-list">
                        <li>
                            <Icon.Twitter /> <a href="https://twitter.com/ahlgren_co" target="_blank" noopener="true">@ahlgren_co</a>
                        </li>
                        <li>
                            <Icon.Messenger /> <a href="https://facebook.com/hampus.ahlgren.1" target="_blank" noopener="true">Hampus Ahlgren</a>
                        </li>
                        <li>
                            <Icon.Email /> <a href="mailto:hampus@ahlgren.co" target="_blank" noopener="true">hampus@ahlgren.co</a>
                        </li>
                    </ul>
                </OffsetSection>
            </Page>
        </div>;
        return slides.props.children;
    }
};

export default WhoAmIPortfolio;