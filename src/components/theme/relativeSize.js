
export function relativeSize(property, size, min, max, measurement = 'vw') {
    // size * screenWith = min
    const minScreenWith = min / (size / 100);
    const maxScreenWith = max / (size / 100);

    const generatedString = `
        ${property}: ${size}${measurement};

        @media(max-width: ${minScreenWith}px){
            ${property}: ${min}px;
        }

        @media(min-width: ${maxScreenWith}px){
            ${property}: ${max}px;
        }
    `;
    return generatedString;
};