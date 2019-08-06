import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../theme/ThemeComponents';
import { baseText } from '../theme/ThemeRules';
import { box } from '../theme/BaseRules';
import ScalingProvider from '../scaling/ScalingProvider';

// get the list of icons
const iconFiles = require
    .context('./icons', true, /./)
    .keys()
    .map(iconFile => {
        let iconName = iconFile.replace('./', '');

        // remove the ext
        iconName = iconName.replace(
            iconName.match(/\.(?:.(?!\.))+$/).pop(),
            ''
        );

        return {
            iconName,
            filePath: require('./icons/' + iconFile.replace('./', ''))
        };
    });

function getIconFile(name) {
    const icon = iconFiles.find(icon => {
        if (icon.iconName === 'icon-' + name) {
            return true;
        }
    });

    if (icon) {
        return icon.filePath;
    } else {
        throw new Error('There is no icon called: ' + name);
    }
}



const IconImage = styled.img`
    ${props => {
        if (props.size) {
            return 'width: ' + props.size;
        }
    }}

    ${props => (`
        width: ${props.rSize * 60}px;
    `)}
`;

const IconImageWrapper = styled.div`
    height: ${props => {

        if(props.defaultHeight || props.rSize){
            return ''
        }

        if (props.largeIcon) {
            return '62px';
        } else {
            return '48px';
        }
    }};
    display: flex;
    align-items: center;
`;


const MainLabel = styled.div`
    ${baseText}
    font-weight: 700;
    color: #606060;
    font-size: 19px;
    letter-spacing: -0.76;
    line-height: 1em;

    ${props => (`
        font-size: ${props.rSize * 19}px;
        margin-top: ${props.rSize * 5}px;
    `)}
`;



const SecondaryLabel = styled.div`
    ${baseText}
    font-size:15px;
    color: #606060;
    letter-spacing: -0.58;
    line-height: 1em;

    ${props => (`
        font-size: ${props.rSize * 15}px;
    `)}
`;

/**
 * @usage
 *
 * ```javascript
 * <Icon name="customer" 
 *       spacing="10px" 
 *       horizontal={true} 
 *       size="20px"
 *       rSize={20}
 *       mainLabel="Big Label" 
 *       secondaryLabel="Smaller Label" />
 * ```
 */
// @sv:react-bootstrap
const Icon = props => {
    return (
        <Box
            inline
            center
            spacing={props.spacing}
            row={props.horizontal}
            {...props}
        >
            <IconImageWrapper
                rSize={props.rSize}
                largeIcon={props.largeIcon}
                defaultHeight={props.defaultHeight}
                className="icon--icon-wrapper"
            >
                <IconImage size={props.size} rSize={props.rSize} src={getIconFile(props.name)} />
            </IconImageWrapper>
            <Box spacing="0px" center={!props.horizontal}>
                {props.mainLabel && <MainLabel rSize={props.rSize}>{props.mainLabel}</MainLabel>}
                {props.secondaryLabel && (
                    <SecondaryLabel rSize={props.rSize}>{props.secondaryLabel}</SecondaryLabel>
                )}
            </Box>
        </Box>
    );
};

export const ScaledIcon = props => (
    <ScalingProvider min={320} max={800}>
        {(ratio) => (
            <Icon rSize={0.75 + (ratio * .3)} {...props} />
        )}
    </ScalingProvider>
);

Icon.defaultProps = {
    spacing: '5px',
    largeIcon: false
};
Icon.propTypes = {
    name: PropTypes.string,
    mainLabel: PropTypes.string,
    secondaryLabel: PropTypes.string,
    size: PropTypes.string,
    rSize: PropTypes.number,
    spacing: PropTypes.string,
    largeIcons: PropTypes.bool
};

const StyledIconContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    > * {
        margin: 0 ${props => props.iconMargin} ${props => props.iconMargin};
    }

    ${box}
`;

const IconContainer = props => (
    <StyledIconContainer row {...props}>
        {props.children}
    </StyledIconContainer>
);

IconContainer.defaultProps = {
    iconMargin: '20px',
    iconSize: 'small'
};

IconContainer.propTypes = {
    iconMargin: PropTypes.string,
    width: PropTypes.string,
    iconSize: PropTypes.string
};

// const IconContainer = props => {
//     return (
//         <StyledIconContainer>
//             {props.icons.map(iconName => {
//                 return <Icon name={iconName} />;
//             })}
//         </StyledIconContainer>
//     );
// };
// IconContainer.propTypes = {
//     icons: PropTypes.array
// };

export { Icon, IconContainer };
// export default IconContainer;
