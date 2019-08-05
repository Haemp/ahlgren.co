import React from 'react';
import '../shared.css';
import './skills.css';

import {Header, Text} from '../Typography';
import {InnerPage} from '../Layout';

export default class Skills extends React.Component{

    render(){
        return(
            <InnerPage>
                <div className="ah-abilities">
                    <Header>So to summarize</Header>
                    <ul className="Typo-ul Skills-list L-center">
                        <li>Strong practical knowledge of the design and development process of web applications</li>
                        <li>An impossible drive to improvement - both personally and professionally</li>
                        <li>A decade of experience of what it takes to actually ship something. Orchestrating the many facets of web development into the final product.</li>
                        <li>A fast and eager learner</li>
                        <li>Expert in mobile web performance optimizations</li>
                        <li>Team leader, and experienced in weighing and making pragmatic decisions needed to ship.</li>
                        <li>A life-loving, tech-idealizing attitude. I love to learn from others and work with teams of smart people to build something great.</li>
                    </ul>
                </div>
            </InnerPage>
        )
    }
}