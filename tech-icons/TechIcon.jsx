import React from 'react';
import './tech-icon.css';
import PropTypes from 'prop-types';

import angularIcon                  from '../icons/icon-angular.png';
import awsIcon                      from '../icons/icon-aws.png';
import css3Icon                     from '../icons/icon-css3.png';
import dockerIcon                   from '../icons/icon-docker.png';
import electronIcon                 from '../icons/icon-electron.png';
import firebaseIcon                 from '../icons/icon-firebase.png';
import googleCloudFunctionsIcon     from '../icons/icon-google-cloud-functions.png';
import googleComputeEngineIcon      from '../icons/icon-google-compute-engine.png';
import googleSQLIcon                from '../icons/icon-google-sql.png';
import html5Icon                    from '../icons/icon-html5.png';
import javaIcon                     from '../icons/icon-java.png';
import javascriptIcon               from '../icons/icon-javascript.png';
import matterIcon                   from '../icons/icon-matterjs.png';
import mixpanelIcon                 from '../icons/icon-mixpanel.png';
import nodeIcon                     from '../icons/icon-node.png';
import reactIcon                    from '../icons/icon-react.png';
import sassIcon                     from '../icons/icon-sass.png';
import sentryIcon                   from '../icons/icon-sentry.png';
import sideviewIcon                 from '../icons/icon-sideview.png';
import sketchIcon                   from '../icons/icon-sketch.png';
import webRTCIcon                   from '../icons/icon-web-rtc.png';
import webpackIcon                  from '../icons/icon-webpack.png';
import wordpressIcon                from '../icons/icon-wordpress.svg';
import codeIgniterIcon              from '../icons/icon-code-igniter.svg';
import dreamWeaverIcon              from '../icons/icon-dream-weaver.svg';

export default class TechIcon extends React.Component{

    render(){
        return (
            <div className="ah-tech-icon" >
                <div className="ah-tech-icon--img-wrapper">
                    <img src={this.props.iconUrl} title={this.props.title}/>
                </div>
                <label>{this.props.label}</label>
            </div>
        )
    }
}
TechIcon.propTypes = {
    label: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired
}

TechIcon.Angular                    = () => <TechIcon iconUrl={angularIcon}                 label="Angular" />
TechIcon.AWS                        = () => <TechIcon iconUrl={awsIcon}                     label="AWS" title="Amazon Web Services" />
TechIcon.CSS3                       = () => <TechIcon iconUrl={css3Icon}                    label="CSS3" />
TechIcon.Docker                     = () => <TechIcon iconUrl={dockerIcon}                  label="Docker" />
TechIcon.Electron                   = () => <TechIcon iconUrl={electronIcon}                label="Electron" />
TechIcon.Firebase                   = () => <TechIcon iconUrl={firebaseIcon}                label="Firebase" />
TechIcon.GoogleCloudFunctions       = () => <TechIcon iconUrl={googleCloudFunctionsIcon}    label="GCF" title="Google Cloud Functions" />
TechIcon.GoogleComputeEngine        = () => <TechIcon iconUrl={googleComputeEngineIcon}     label="GCE" title="Google Compute Engine" />
TechIcon.GoogleSQL                  = () => <TechIcon iconUrl={googleSQLIcon}               label="GSQL" title="Google SQL" />
TechIcon.HTML5                      = () => <TechIcon iconUrl={html5Icon}                   label="HTML5" />
TechIcon.Java                       = () => <TechIcon iconUrl={javaIcon}                    label="Java" />
TechIcon.Javascript                 = () => <TechIcon iconUrl={javascriptIcon}              label="Javascript" />
TechIcon.Matter                     = () => <TechIcon iconUrl={matterIcon}                  label="Matter" />
TechIcon.Mixpanel                   = () => <TechIcon iconUrl={mixpanelIcon}                label="Mixpanel" />
TechIcon.Node                       = () => <TechIcon iconUrl={nodeIcon}                    label="Node" />
TechIcon.React                      = () => <TechIcon iconUrl={reactIcon}                   label="React" />
TechIcon.SASS                       = () => <TechIcon iconUrl={sassIcon}                    label="SASS" />
TechIcon.Sentry                     = () => <TechIcon iconUrl={sentryIcon}                  label="Sentry" />
TechIcon.SideView                   = () => <TechIcon iconUrl={sideviewIcon}                label="SideView" />
TechIcon.Sketch                     = () => <TechIcon iconUrl={sketchIcon}                  label="Sketch" />
TechIcon.WebRTC                     = () => <TechIcon iconUrl={webRTCIcon}                  label="WebRTC" />
TechIcon.Webpack                    = () => <TechIcon iconUrl={webpackIcon}                 label="Webpack" />
TechIcon.Wordpress                  = () => <TechIcon iconUrl={wordpressIcon}               label="Wordpress" />
TechIcon.CodeIgniter                = () => <TechIcon iconUrl={codeIgniterIcon}             label="CodeIgniter" />
TechIcon.DreamWeaver                = () => <TechIcon iconUrl={dreamWeaverIcon}             label="DreamWeaver" />


TechIcon.Container = (props) => <div className="ah-tech-icon--container">
    <div className="ah-tech-icon--inner-container">
        {props.children}
    </div>
</div>