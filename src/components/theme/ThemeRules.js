import { css } from 'styled-components';
import { box as baseBox, breakpoint } from './BaseRules';
import { relativeSize } from './relativeSize';

export const fontSmoothing = css`
    -webkit-font-smoothing: antialiased;
`;

export const baseFont = css`
    font-family: 'Source Sans Pro', sans-serif;
`;

export const fontAlign = props =>
    (props.center ? `text-align: center;` : '') +
    (props.rightAlign ? `text-align: right;` : '') +
    (props.leftAlign ? `text-align: left;` : '');

export const fontSizeMap = size => {
    switch (size) {
        case 'small':
            return '12px';
        case 'medium':
            return '42px';
        case 'large':
            return '70px';
        default:
            return size;
    }
};

export const fontSize = props =>
    props.size ? `font-size: ${fontSizeMap(props.size)};` : '';

export const relativeFontSize = props =>
    props.relSize
        ? `${relativeSize(
              'font-size',
              props.relSize || 4,
              props.sizeMin || 18,
              props.sizeMax || 50,
              'vw'
          )}`
        : '';

export const fontColor = props => (props.color ? `color: ${props.color};` : '');

export const baseText = css`
    ${fontAlign}
    ${baseFont}
    ${fontSmoothing}
    ${fontSize}
    ${relativeFontSize}
    ${fontColor}

    ${breakpoint}
`;

export const box = css`
    ${baseBox}
    ${props => {
        if (props.dark) {
            return 'background-color: #191b23;';
        }
    }}
`;

export const fat = css`
    ${baseText}

    color: #333;
    font-weight: 700;
    letter-spacing: -0.07em;
    margin: 0;
`;

export const subtitle = css`
    ${baseText}
    font-weight: 300;
    color: #9fabbf;
    letter-spacing: -0.04em;
    -webkit-font-smoothing: auto;
`;

export const paragraph = css`
    font-weight: 300;
    font-size: 22px;
    letter-spacing: 0em;
    line-height: 1.35em;

    ${baseText}
`;

export const border = css`
    border: 1px solid #49506a;
`;

export const shadowDetails = {
    base: '0 3px 8px rgba(0,0,0,0.3)',
    raised: '0 5px 15px rgba(0,0,0,0.3)',
    depressed: '0 1px 2px rgba(0,0,0,0.3)'
}

export const shadow = css`
    box-shadow: ${shadowDetails.base};

    /* @media(max-width: 320px){
        box-shadow: 0 15px 45px rgba(0, 0, 0, 0.3);
    }

    @media(min-width: 1000px){
        box-shadow: 0 15px 45px rgba(0, 0, 0, 0.3);
    } */
`;

