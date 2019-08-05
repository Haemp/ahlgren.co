import classNames from 'classnames';
import React from 'react';

import './typography.css';

const Header = props => <h1 className={classNames([
        props.className, 
        'Typo-header', 
        'Typo-centered'
    ])}>
    {props.children}
</h1> ;

const List = props => <ul className={classNames(['Typo-ul', props.className])}>
    {props.children}
</ul>;

const Text = props => <p className={classNames([props.className,'Typo-para',])}>
    {props.children}
</p> ;

export {
    Header,
    Text,
    List
}