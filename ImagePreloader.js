function loadImage(imageUrl){
    return new Promise((resolve, reject)  => {
        console.time(imageUrl);
        console.log('Pre-loading image: ', imageUrl);
    
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            console.log('Image: ', imageUrl, ' resolved');
            console.timeEnd(imageUrl);
            resolve();
        };
        
        img.onerror = (err) => {
            console.log('Image: ', imageUrl, ' could not be resolved: ', err);
            console.timeEnd(imageUrl);
            reject();
        };
    });
}

export default function preloadImages(imageUrls){
    return Promise.all(imageUrls.map(imageUrl => loadImage(imageUrl)))
}