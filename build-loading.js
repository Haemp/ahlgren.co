var compressor = require('node-minify');

compressor.minify({
    compressor: 'gcc',
    input: './loading/Loading.js',
    output: './public/Loading.min.js',
    callback: function (err, min) {
        console.log('Finished!')
    }
 });