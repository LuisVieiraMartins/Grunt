module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      
    // Minificador de ficheiros css
    cssmin: {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1,
            keepSpecialComments: 0 // Remove os comentários
        },
        target: {
            files: {
                'prod/scripts/css/animate.min.css': ['dev/css/animate.css'],
                'prod/scripts/css/estilos.min.sass.css': ['dev/sass/compilado/csstotal.css'],
            }
        }
    },      
      
    // Minificador de ficheiros JavaScript
    uglify: {
        options:{
            manage: false,
            //preserveComments: 'all'
        },
        my_target: {
            files: [{
                expand: true,
                cwd:   'dev/js/',
                src:   '*.js',
                dest:  'prod/scripts/js/',
                ext:   '.min.js'
            }]           
        }
    },
      
    // Compilador de ficheiros SASS
    sass: {
        dist: {
            files: [{
                expand: true,
                cwd: 'dev/sass/',
                src: ['*.scss'],
                dest: 'dev/sass/compilado/',
                ext: '.css'
            }]
        }
    },
  
    // Junta vários ficheiros num só 
    concat: {
        basic_and_extras: {
            files: {
                'dev/sass/compilado/csstotal.css': ['dev/sass/compilado/texto.css', 'dev/sass/compilado/reset.css', 'dev/sass/compilado/navegacao.css'],
            },
        },
    },
      
    // Verifica as alterações nos ficheiros e executa automaticamente as tarefas
    watch: {
        sass:{
            files: ['dev/sass/*.scss'],
            tasks: ['sass', 'concat', 'cssmin'],
        },
        cssmin:{
            files: ['dev/css/*.css'],
            tasks: ['cssmin'],
        },
        uglify:{
            files: ['dev/js/*.js'],
            tasks: ['uglify'],
        }
    },

  });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ["watch"]);
};