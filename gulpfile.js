const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");

function css(done){
    src('./src/scss/**/*.scss') // Identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) // Compilarlo
    .pipe(dest("build/css"))  // Alamacenarlo en el disco duro

    done();//callback function que avisa a gulp cuando llegamo al final de la function
}

function dev(done) {
    watch("./src/scss/**/*.scss", css)
    done();
}

exports.css = css
exports.dev = dev

