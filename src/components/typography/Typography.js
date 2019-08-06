
import styled from 'styled-components';
import {
    shadow,
    fat,
    paragraph,
    baseText,
    relativeFontSize
} from '../theme/ThemeRules';

export const Paragraph = styled.div`
    ${paragraph}

    ${relativeFontSize({ relSize: 3, sizeMin: 18, sizeMax: 24})};
`;

export const SubTitle = styled.div`
    ${paragraph}
    ${relativeFontSize({ relSize: 3.2, sizeMin: 20, sizeMax: 26})};
    font-style: italic;
    text-align: center;
`

export const Title = styled.div`
    font-size: 54px;
    text-align: center;
    ${fat}

    ${relativeFontSize({ relSize: 8, sizeMin: 42, sizeMax: 64 })};
`;

export const H1 = styled.h1`
    font-size: 32px;
    ${fat}

    ${relativeFontSize({ relSize: 5, sizeMin: 28, sizeMax: 32})};
`;

export const H2 = styled.h2`
    font-size: 25px;
    ${fat}

    ${relativeFontSize({ relSize: 3, sizeMin: 23, sizeMax: 28})};
`;

export const H3 = styled.h2`
    font-size: 25px;
    ${fat}

    ${relativeFontSize({ relSize: 2.5, sizeMin: 18, sizeMax: 22})};
`;

export const A = styled.a`
    color: #333;
`

export const Link = styled.a`
    ${fat}
    font-size: 28px;
    text-align: center;
`;
