// @ts-check
import React from 'react';
import styled from 'styled-components'
import { paragraph } from './ThemeRules';
import { relativeSize } from './relativeSize';
const leaf = require('./icon-leaf.svg');

export const ListItem = styled.li`
    background-position-y: 4px;
    background-image: url(${leaf}); 
    background-repeat: no-repeat;
    list-style: none;
    padding-left: 35px;
    ${paragraph}
    ${relativeSize('font-size', 3.5, 16, 20)}
`

export const List = styled.ul`
    padding: 0;
    padding-left: 10px;
    > * {
        margin-bottom: 10px;
    }
`