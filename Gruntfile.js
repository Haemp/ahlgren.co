module.exports = function (grunt) {
    // Configure grunt
    grunt.initConfig({
        sprite:{
            all: {
                src: 'public/img/sprites/*.png',
                dest: 'public/img/spritesheet.png',
                destCss: 'public/css/sprites.css'
            }
        }
    });

    // Load in `grunt-spritesmith`
    grunt.loadNpmTasks('grunt-spritesmith');


};