// @ts-check
import React from 'react';
import styled, {keyframes} from 'styled-components';
import { fat, subtitle, paragraph, box, baseText, relativeFontSize, shadow } from './ThemeRules';
import { breakpoint } from './BaseRules';

export const Text = styled.div`
    ${baseText}
`;

export const Title = styled.div`
    ${relativeFontSize({ relSize: 8, sizeMin: 40, sizeMax: 80 })};  
    ${fat}
    line-height: 1;
`;


const doubleClickAnimation = keyframes`
    0%{
        transform: scale3d(1,1,1);
    }
    2.5%{
        transform: scale3d(0.9,0.9,0.9);
    }
    7.5%{
        transform: scale3d(1,1,1);
    }
    10%{
        transform: scale3d(0.9,0.9,0.9);
    }
    15%{
        transform: scale3d(1,1,1);
    }
    100%{
        transform: scale3d(1,1,1);
    }
`
export const A = styled.a`
    color: #333;
    display:inline-block;

    :hover{
        animation: ${doubleClickAnimation} 5s infinite ease-in-out;
    }
`

export const SecondTitle = styled.div`
    ${fat}
    ${({size}) => `
        font-size: ${size};
    `}
`;

export const Subtitle = styled.div`
    ${relativeFontSize({ relSize: 4, sizeMin: 24, sizeMax: 40 })};  
    ${subtitle}
`;

export const CalloutText = styled.div`
    ${relativeFontSize({ relSize: 2.5, sizeMin: 20, sizeMax: 30 })};  
    ${subtitle}
`;

export const Paragraph = styled.div`
    font-size: 38px;
    ${paragraph}
`;

export const Box = styled.div`
    ${box}
`;

export const MediaBox = props => (
    <Box
        {...props}
        breakpoint={{
            'width < 850px': `
            flex-direction:column-reverse;
        `
        }}
    >
        {props.children}
    </Box>
);

export const aspect = props => {
    if (!props.aspect) return '';

    const aspects = props.aspect.split(':');
    const paddingTop = (parseInt(aspects[1]) / parseInt(aspects[0])) * 100;

    return `
        position:relative;
        &:before{
            content: '';
            display: block;
            height: 0;
            
            // pushing the floated item 
            // out to the left side.
            width: 1px;
            margin-left: -1px;

            // forcing the height as a percentage 
            // of the width
            padding-top: ${paddingTop}%;
        }
    `;
};

const OuterAspectBox = styled(Box)`
    position: relative;
    ${aspect}
`;

const InnerAspectBox = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

/**
 * @usage
 * ```javascript
 *  <AspectBox spacing="1:45">Stuff in here will appear in 1/45 aspect ratio</AspectBox>
 * ```
 */
export const AspectBox = props => {

    if(!props.aspect){
        return <Box {...props}>
            {props.children}
        </Box>
    }
    
    return (
        <OuterAspectBox {...props}>
            <InnerAspectBox {...props}>{props.children}</InnerAspectBox>
        </OuterAspectBox>
    );
};


const StyledShadowBox = styled(Box)`
    border-radius: 16px;
    ${shadow}
`
export const ShadowBox = props => {
    return <StyledShadowBox {...props}>
        {props.children}
    </StyledShadowBox>
}