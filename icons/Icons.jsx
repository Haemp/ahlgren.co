import React from 'react';

import SvgTwitter       from './icon-twitter.react.svg';
import SvgMessenger     from './icon-messenger.react.svg';
import SvgEmail         from './icon-email.react.svg';
import SvgWeb           from './icon-web.react.svg';
import SvgStartup       from './icon-startup.react.svg';
import SvgLobster       from './icon-lobster.react.svg';
import SvgProduct       from './icon-product.react.svg';
import SvgHumanity      from './icon-humanity.react.svg';
import SvgCoffee        from './icon-coffee.react.svg';

import './icons.css'

const exportObj = {};
function capitalize(str){
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
[
    {svg: SvgTwitter, label: 'twitter'},
    {svg: SvgMessenger, label: 'messenger'},
    {svg: SvgEmail, label: 'email'},
    {svg: SvgWeb, label: 'web'},
    {svg: SvgStartup, label: 'startup'},
    {svg: SvgLobster, label: 'lobster'},
    {svg: SvgProduct, label: 'product'},
    {svg: SvgHumanity, label: 'humanity'},
    {svg: SvgCoffee, label: 'coffee'},
].forEach(component => {
    exportObj[capitalize(component.label)] = props => <div className={'ah-icon ' + 'ah-icon-'+component.label}>
        <div className="ah-icon--label-wrapper">
            <component.svg />
            {props.label && <label className="ah-icon--label">{props.label}</label>}
        </div>
    </div>
})

exportObj.Container = props => <div className={props.className + ' ah-icon-container'}>
    {props.children}
</div>;

export default exportObj;