import React from 'react';

import {Header, Text} from '../Typography';
import { InnerPage, Page } from '../Layout';

const Future = props => <div className="ah-future">
    <Page>
        <InnerPage>            
            <Header>The Future</Header>
            <Text>
                So that's what I've done in the past. For the future I'm going to 
                continue working where I love. At the intersection between customers 
                and engineers. Engineering systems, Working with Smart and Fun people, 
                understanding markets and first and foremost - building great products.
            </Text>
            <Text>
                So if you'd like to work with me... or what the hell even if you just 
                want to geek out around tech or product development - send me a message! 
            </Text>
            <Text>
                The best way to reach me would be Messenger, but if you'd rather rely on the 
                trusty SMTP procotol here's where I'm at: hampus@ahlgren.co. My loyal twitter 
                followers (of whom there are currently 10) will reach me over here @ahlgren_co
            </Text>
        </InnerPage>
    </Page>
    <Page>
        <InnerPage>
            <Header>You take care now</Header>
            <Text>/Hampus</Text>
        </InnerPage>
    </Page>
</div>

export default Future;