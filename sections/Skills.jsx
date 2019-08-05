import React from 'react';
import CoffeeMeter from '../CoffeeMeter';
import {Header} from '../Typography'

import '../shared.css';
import './skills.css';
import { InnerPage } from '../Layout';

export default class Skills extends React.Component{
    render(){
        return(
            <div className="ah-skills">
                <ul>
                    <li>
                        <CoffeeMeter label="Frontend" rank={5} />
                    </li>
                    <li>
                        <CoffeeMeter label="Backend" rank={3} />
                    </li>
                    <li>
                        <CoffeeMeter label="Design UX/UI" rank={4} />
                    </li>
                    <li>
                        <CoffeeMeter label="Product Development" rank={5} />
                    </li>
                </ul>
            </div>
        )
    }
}