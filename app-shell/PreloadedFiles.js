const allIconsContext = require.context('../icons', true, /.(svg|png)$/);
const allLogosContext = require.context('../logos', true, /.(svg|png)$/);
const allImagesContext = require.context('../images', true, /.svg$/);
const starsBackground = require('../images/background-stars-v2.png')

function getImagesFromCollection(collection){
    
    return collection.keys()
        .filter(key => {
            if(key.match(/\.(react\.svg|jsx|css)/)){
                console.log('Key: ', key, ' did not match the files we were looking for');
                return false
            }
            return true
        })
        .map(key => {
            console.log('Contenxt key: ', key, ' module ', collection(key));
            return collection(key);
        })
}

const allImages = getImagesFromCollection(allIconsContext)
                        .concat(getImagesFromCollection(allLogosContext))
                        .concat(getImagesFromCollection(allImagesContext))
                        .concat([starsBackground])

module.exports = allImages;