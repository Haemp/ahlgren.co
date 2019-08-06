import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Title } from '../theme/ThemeComponents';
import { Icon } from '../icon-container/IconContainer';
import { shadow } from '../theme/ThemeRules';
import Breakpoints from '../Breakpoints';
import { ScaledTitle } from '../theme/ScaledComponents';

const StyledIcon = styled(Icon)``;

const StyledSkills = styled(Box)`
    ${shadow}

    border-radius: 16px;
    padding: 30px;
    max-width: 900px;
    width: 100%;
    transition: all 0.15s ease-out;
    box-sizing: border-box;
`;

const StyledSkillItem = styled(Box)`
    border-bottom: 1px solid #d1d1d1;
    padding-bottom: 20px;

    :last-child {
        border: 0;
    }

    @media (max-width: 500px) {
        padding-bottom: 10px;
        ${StyledIcon} {
            .icon--icon-wrapper {
                display: none;
            }
        }
    }

    @media (max-width: 500px) {
        ${StyledIcon} {
            .icon--icon-wrapper {
                display: none;
            }
        }
    }
`;
const CoffeeContainer = styled(Box)`
    margin-left: auto;
`;
const SkillItem = props => {
    const iconSpacing = window.innerWidth < 500 ? '5px' : '10px';
    const iconSize = window.innerWidth < 500 ? '20px' : '30px';

    return (
        <StyledSkillItem row>
            <StyledIcon
                spacing="10px"
                size="45px"
                horizontal
                name={props.icon}
                mainLabel={props.mainLabel}
                secondaryLabel={props.secondaryLabel}
            />
            <CoffeeContainer row spacing={iconSpacing}>
                {[...new Array(props.rank)].map((value, index) => {
                    return <Icon size={iconSize} key={index} name="coffee" />;
                })}
            </CoffeeContainer>
        </StyledSkillItem>
    );
};

const ContentContainer = styled(Box)`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
`;
class Skills extends Component {
    render() {
        return (
            <StyledSkills spacing="20px">
                <ScaledTitle center>What I do</ScaledTitle>
                <Breakpoints conditions={['0 < width < 500']}>
                    <ContentContainer spacing="5px">
                        <SkillItem
                            rank={5}
                            icon="frontend"
                            mainLabel="Frontend"
                            secondaryLabel="Engineering"
                        />
                        <SkillItem
                            rank={3}
                            icon="backend"
                            mainLabel="Backend"
                            secondaryLabel="Engineering"
                        />
                        <SkillItem
                            rank={5}
                            icon="ui"
                            mainLabel="UX/UI"
                            secondaryLabel="Design"
                        />
                        <SkillItem
                            rank={5}
                            icon="product"
                            mainLabel="Product"
                            secondaryLabel="Management"
                        />
                        <SkillItem
                            rank={4}
                            icon="customer"
                            mainLabel="Customer"
                            secondaryLabel="Development"
                        />
                    </ContentContainer>
                </Breakpoints>
                <Breakpoints conditions={['500 < width < 99999']}>
                    <ContentContainer spacing="20px">
                        <SkillItem
                            rank={5}
                            icon="frontend"
                            mainLabel="Frontend"
                            secondaryLabel="Engineering"
                        />
                        <SkillItem
                            rank={3}
                            icon="backend"
                            mainLabel="Backend"
                            secondaryLabel="Engineering"
                        />
                        <SkillItem
                            rank={5}
                            icon="ui"
                            mainLabel="UX/UI"
                            secondaryLabel="Design"
                        />
                        <SkillItem
                            rank={5}
                            icon="product"
                            mainLabel="Product"
                            secondaryLabel="Management"
                        />
                        <SkillItem
                            rank={4}
                            icon="customer"
                            mainLabel="Customer"
                            secondaryLabel="Development"
                        />
                    </ContentContainer>
                </Breakpoints>
            </StyledSkills>
        );
    }
}

export default Skills;
