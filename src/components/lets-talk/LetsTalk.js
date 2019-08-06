import React, { Component } from 'react';
import { ShadowBox, Title, Paragraph, Box } from '../theme/ThemeComponents';
import styled from 'styled-components';
import { Icon } from '../icon-container/IconContainer';
import tinyColor from 'tinycolor2';
import { box } from '../theme/ThemeRules';
import { ScaledTitle } from '../theme/ScaledComponents';

const StyledShadowBox = styled(ShadowBox)`
    padding: 40px;
    box-sizing: border-box;
`;

const StyledContactButton = styled.a`  
    
    border-radius: 13px;
    display: inline-flex;
    transition: background-color, border-color, 0.2s;
    cursor: pointer;
    padding: 25px 0px;
    width: 100%;
    max-width: 200px;
    border: 5px solid ${({ borderColor }) => borderColor || 'transparent'};
    background-color: ${({ backgroundColor }) =>
        backgroundColor || 'transparent'};

    img{
        user-select: none;
        transition: all 0.3s;
    }

    :hover{

        img{
            transform: scale3d(1.15,1.15,1.15);
        }
        background-color: ${({ backgroundColor }) => {
            return tinyColor(backgroundColor)
                .darken(3)
                .toString();
        }}
        border-color: ${({ borderColor }) => {
            return tinyColor(borderColor)
                .darken(12)
                .toString();
        }};
    }

    :active{
        transform: scale3d(0.9,0.9,0.9);
    }

    ${box}
`;

const ContactButtonContainer = styled(Box)``;

const ContactButton = ({ borderColor, backgroundColor, icon, link }) => (
    <StyledContactButton
        href={link}
        target="_blank"
        center
        borderColor={borderColor}
        backgroundColor={backgroundColor}
    >
        {icon}
    </StyledContactButton>
);
class LetsTalk extends Component {
    render() {
        return (
            <StyledShadowBox spacing="50px">
                <Box spacing="20px">
                    <ScaledTitle center>Let's Talk!</ScaledTitle>
                    <Paragraph>
                        Do you have an interesting project in the works? Or just
                        want to shoot the shit on tech and the future in
                        general? Don't be shy, just send me a message. 
                    </Paragraph>
                    <Paragraph>
                        Facebook messenger is probably where you'll get the fastest reply
                        but Twitter or good ol' fashioned email works as well.
                    </Paragraph>
                    <Paragraph >
                        Have a good one! 😊👌
                    </Paragraph>
                </Box>
                <ContactButtonContainer
                    breakpoint={{
                        'width < 500px': `
                        flex-direction: column;
                        > * {
                            max-width: initial;
                            margin-bottom: 10px;
                        }
                    `
                    }}
                    row
                    justifyContent="space-between"
                    spacing="20px"
                >
                    <ContactButton
                        borderColor="#94CAFD"
                        backgroundColor="#EAF5FF"
                        icon={<Icon name="messenger" />}
                        link="https://www.messenger.com/t/hampus.ahlgren.1"
                    />
                    <ContactButton
                        borderColor="#EFAEA8"
                        backgroundColor="#FCF0EF"
                        link="mailto:hampus@ahlgren.co"
                        icon={<Icon name="gmail" />}
                    />
                    <ContactButton
                        borderColor="#8ED9F6"
                        backgroundColor="#E8F7FD"
                        link="https://twitter.com/ahlgren_co"
                        icon={<Icon name="twitter" />}
                    />
                </ContactButtonContainer>
            </StyledShadowBox>
        );
    }
}

export default LetsTalk;
