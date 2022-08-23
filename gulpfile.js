const { src, dest, watch, parallel } = require("gulp");
// Css
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");

// Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require('gulp-avif');

function css(done){
    src('./src/scss/**/*.scss') // Identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) // Compilarlo
    .pipe(dest("build/css"))  // Alamacenarlo en el disco duro

    done();//callback function que avisa a gulp cuando llegamo al final de la function
}

function imagenes(done){
    const opciones = {
        optimmizationLevel: 3,
    }
    src("./src/img/**/*.{png,jpg,jpeg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("./build/img"))
    done();
}

function versionWebp(done){
const opciones = {
    quality:50
};
    src("./src/img/**/*.{png,jpg,jpeg}")
    .pipe(webp(opciones))
    .pipe(dest("./build/img"))
    done();
}

function versionAvif(done){
    const opciones = {
        quality:50
    };
        src("./src/img/**/*.{png,jpg,jpeg}")
        .pipe(avif(opciones))
        .pipe(dest("./build/img"))
        done();
    }

function javascript(done){
    src("./src/js/**/*.js")
    .pipe(dest("./build/js"));
    done();
}    

function dev(done) {
    watch("./src/scss/**/*.scss", css)
    watch("./src/js/**/*.js",javascript)
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp,versionAvif,javascript,dev);

