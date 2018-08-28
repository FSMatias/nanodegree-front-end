module.exports = function (grunt) {

    grunt.initConfig({
      responsive_images: {
        dev: {
          options: {
            /* 
             * Available engines:
             * gm: GraphicsMagick
             * im: ImageMagick
             */
            engine: 'gm',
            sizes: [
              {
                width: '400',
                suffix: "-small",
                quality: 35
              },
              {
                width: '500',
                suffix: "-medium",
                quality: 50
              }
            ]
          },
  
          /* 
           Directory structure.
          */
          files: [{
            expand: true,
            src: ['*.{gif,jpg,png}'],
            cwd: 'img/',
            dest: 'img-responsive/'
          }]
        }
      },
  
      /* Clear out the images directory if it exists */
      clean: {
        dev: {
          src: ['img-responsive'],
        },
      },
  
      /* Generate the images directory if it is missing */
      mkdir: {
        dev: {
          options: {
            create: ['img-responsive']
          },
        },
      },
  
      /* Copy the "fixed" images that don't go through processing into the images/directory */
      // In this case in particular, there is no fixed image.
      copy: {
        dev: {
          files: [{
            expand: true,
            src: 'img/fixed/*.{gif,jpg,png}',
            dest: 'img-responsive/'
          }]
        },
      },
    });
  
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);
  
  };