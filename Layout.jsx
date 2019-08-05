import React from 'react';
import './layout.css';

const Page = props => <div className="ah-page">
    {props.children}
</div>;

const InnerPage = props => <div className="ah-inner-page">
    {props.children}
</div>;

export {Page, InnerPage};