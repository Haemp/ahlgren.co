import React, { Component } from 'react';
import { IconContainer, ScaledIcon } from '../icon-container/IconContainer';
import Skills from './Skills';

const skillIcons = {
    frontend: (
        <ScaledIcon
            key="frontend"
            largeIcon={true}
            name="frontend"
            mainLabel="Frontend"
            secondaryLabel="Engineer"
        />
    ),
    backend: (
        <ScaledIcon
            key="backend"
            name="backend"
            largeIcon={true}
            mainLabel="Backend"
            secondaryLabel="Engineer"
        />
    ),
    ui: (
        <ScaledIcon
            name="ui"
            key="ui"
            largeIcon={true}
            mainLabel="UI/UX"
            secondaryLabel="Designer"
        />
    ),
    customer: (
        <ScaledIcon
            key="customer"
            name="customer"
            largeIcon={true}
            mainLabel="Customer"
            secondaryLabel="Developer"
        />
    ),
    product: (
        <ScaledIcon
            key="product"
            name="product"
            largeIcon={true}
            mainLabel="Product"
            secondaryLabel="Manager"
        />
    )
};

class SkillsContainer extends Component {
    render() {
        return (
            <IconContainer iconSize="large" iconMargin="15px">
                {this.props.skills.map(skill => {
                    return skillIcons[skill];
                })}
            </IconContainer>
        );
    }
}

export default SkillsContainer;
