export const spacing = props => `
    ${props.spacing ? `
        ${
            // If the props row is set 
            // we render out the spacing
            // as a right margin
            props.row
                ? `> * {
                margin-right: ${props.spacing};
                :last-child{
                    margin-right:0;
                }
            }`

            // Otherwise we render it out
            // as bottom margin
            : `> * {
                margin-bottom: ${props.spacing};
                :last-child{
                    margin-bottom:0;
                }
            }`
        }
    ` : ``}
`;

/**
 * @usage
 * ```javascript
 * <Box width="60%" breakpoint={{
 *      'width<1000px': 'width: 50%;',
 *      'width<850px': 'width: 100%; order: 2; margin-bottom: 20px',
 * }}>
 * ```
 */
export const breakpoint = props => {

    if(!props.breakpoint) return '';

    // calculate the breakpoint intervals
    const breakpoints = Object.keys(props.breakpoint).map(bounds => {

        const components = bounds.split('<');
        let dimension ;
        let minMeasurement;
        let maxMeasurement;

        if(components.length < 2 || components.length > 3) return '';

        if(components.length === 2){
            dimension = components[0].trim();
            maxMeasurement = components[1].trim();

            return `
                @media(max-${dimension}: ${maxMeasurement}){
                    ${props.breakpoint[bounds]}
                }
            `
        }
        
        if (components.length === 3){
            minMeasurement = components[0].trim();
            dimension = components[1].trim();
            maxMeasurement = components[2].trim();

            return `
                @media (max-${dimension}: ${maxMeasurement}) and (min-${dimension}: ${minMeasurement}){
                    ${props.breakpoint[bounds]}
                }
            `
        }
    })

    return breakpoints.join('\n');
}

export const box = props => `
    display:flex;
    flex-direction: column;

    ${props.inline ? `display: inline-flex;` : ''}
    ${props.row ? `flex-direction: row;` : ''}
    ${props.height ? `height: ${props.height};` : ''}
    ${props.width ? `width: ${props.width};` : ''}    
    ${props.overflow ? `overflow: ${props.overflow};` : ''}        

    ${props.margin ? `margin: ${props.margin};` : ''}
    ${props.padding ? `padding: ${props.padding};` : ''}
    ${props.order ? `order: ${props.order};` : ''}
    ${props.alignItems ? `align-items: ${props.alignItems};` : ''}    
    ${props.justifyContent ? `justify-content: ${props.justifyContent};` : ''}        

    ${spacing(props)}

    ${props.flexFill ? `flex: 1;` : ''}
    ${props.parentFill ? `width: 100%; height: 100%;` : ''}

    ${props.center ? 'justify-content: center; align-items: center;' : ''}

    ${props.vCenter ? 'align-items: center' : ''}
    ${props.hCenter ? 'justify-content: center' : ''}

    ${breakpoint(props)}
`;
