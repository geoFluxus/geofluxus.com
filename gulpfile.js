// NLG THEME-KIT PROJECT
// ## HELP: gulp help

var master_compiler = false;

// INCLUDE
// -----------------------------------------------------------------------------
var gulp  = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    log = require('fancy-log'),
    changed = require('gulp-changed'),
    cleanCss = require('gulp-clean-css'),
    concat = require("gulp-concat"),
    googleWebFonts = require("gulp-google-webfonts"),
    gulpif = require('gulp-if'),
    imagemin = require("gulp-imagemin"),
    order = require("gulp-order"),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    terser = require("gulp-terser"),
    touch = require('gulp-touch'),
    wait = require('gulp-wait'),
    zip = require('gulp-zip'),
    ftp = require("vinyl-ftp"),
    fs = require('fs');

// CONFIG
// -----------------------------------------------------------------------------

// Load main package json
var project = false;
var rroot = './';
var root = rroot;
var proot = '';

// current timestamp in milliseconds
let ts = Date.now();

let date_ob = new Date(ts);
let now_date = date_ob.getDate();
let now_month = date_ob.getMonth() + 1;
let now_year = date_ob.getFullYear();


// FETCH COMAND LINE VARIABLES
const arg = (argList => {
  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');
    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    }
    else {
      // argument name
      curOpt = opt;
      arg[curOpt] = true;
    }
  }
  return arg;
})(process.argv);

// SET THE PROJECT
if(arg.p && master_compiler) {
  proot = 'projects/' + arg.p + '/';
  project = arg.p;
log('[PROJECT] Compiling: ' + arg.p);
}

var path_name = {
  node: 'node_modules',
  source: 'source',
  theme: 'theme',
  dist: 'dist',
  backup: 'backup',
  archive: 'backup',
  maps: 'maps',
  scss: 'scss',
  css: 'css',
  js: 'js',
  jsm: 'js',
  images: 'images',
  img: 'images',
  media: 'media',
  media_source: 'media_source',
  fonts: 'fonts',
  bootstrap: 'bootstrap',
  presets: 'presets'
}
var js_compile = {
  core: 'core',
  plugins: 'plugins',
  elements: 'elements'
}
var file_name = {
  help: 'README.md',
  gfonts: '_fonts.list',
  fonts_scss: '_fonts.scss',
  fonts_bak: '_fonts.bak.scss',
  fonts_old: '_fonts_previous.bak.scss',
  extras: 'gulpfile_extras.js'
}
var options = {
  encoding: 'utf-8',
  delay: 1000,
  image_formats: 'png,jpg,jpeg,svg,gif,PNG,JPG,JPEG,SVG,GIF',
  gfont_url: "@import url('https://fonts.googleapis.com/css?family=|&subset=|&display=swap');"
}

var path_rel = {
  node: path_name.node +'/',
  source: path_name.source +'/',
  theme: path_name.theme +'/',
  dist: path_name.dist +'/',
  backup: path_name.backup +'/',
  archive: path_name.archive +'/',
  maps: path_name.maps +'/',
  maps_rel: '../'+ path_name.maps +'/',
  scss: path_name.scss +'/',
  css: path_name.css +'/',
  js: path_name.js +'/',
  jsm: path_name.jsm +'/',
  images: path_name.images +'/',
  img: path_name.img +'/',
  media: path_name.media +'/',
  media_source: path_name.media_source +'/',
  fonts: path_name.fonts +'/',
  bootstrap: path_name.bootstrap +'/',
  presets: path_name.presets +'/'
}

var path = {
  root: proot,
  node: path_rel.node,
  source: proot + path_rel.source,
  theme: proot + path_rel.source + path_rel.theme,
  dist: proot + path_rel.source + path_rel.dist,
  backup: proot + path_rel.backup,
  archive: path_rel.archive,
  extras: proot + file_name.extras,
  maps: proot + path_rel.source + path_rel.dist + path_rel.maps,
  scss: proot + path_rel.source + path_rel.theme + path_rel.scss,
  css: proot + path_rel.source + path_rel.dist + path_rel.css,
  js: proot + path_rel.source + path_rel.theme + path_rel.js,
  jsm: proot + path_rel.source + path_rel.dist + path_rel.jsm,
  images: proot + path_rel.source + path_rel.theme + path_rel.images,
  img: proot + path_rel.source + path_rel.dist + path_rel.img,
  media: proot + path_rel.media,
  media_source: proot + path_rel.media_source,
  fonts: proot + path_rel.source + path_rel.dist + path_rel.fonts,
  gfonts: proot + path_rel.source + file_name.gfonts,
  fonts_scss: proot + path_rel.source + path_rel.theme + path_rel.scss + file_name.fonts_scss,
  fonts_bak: proot + path_rel.source + path_rel.theme + path_rel.scss + file_name.fonts_bak,
  fonts_old: proot + path_rel.source + path_rel.theme + path_rel.scss + file_name.fonts_old,
  bootstrap: proot + path_rel.source + path_rel.theme + path_rel.scss + path_rel.bootstrap,
  presets:  path_rel.presets
}

var path_abs = {
  root: root + path.root,
  node: rroot + path.node,
  source: root + path.source,
  theme: root + path.theme,
  dist: root + path.dist,
  backup: root + path.backup,
  archive: rroot + path.archive,
  extras: root + path.extras,
  maps: root + path.maps,
  scss: root + path.scss,
  css: root + path.css,
  js: root + path.js,
  jsm: root + path.jsm,
  images: root + path.images,
  img: root + path.img,
  media: root + path.media,
  media_source: root + path.media_source,
  fonts: root + path.fonts,
  gfonts: root + path.gfonts,
  fonts_scss: root + path.fonts_scss,
  fonts_bak: root + path.fonts_bak,
  fonts_old: root + path.fonts_old,
  bootstrap: root + path.bootstrap,
  presets: root + path.presets
}

var lexicon = {
  no_help: 'There is no help! ',
  please_check: 'Please check ',
  not_found: 'File not found ',
  with_delay: 'with delay ',
  building: 'Building '
}


var config = JSON.parse(fs.readFileSync(path_abs.root + 'package.json'));


if(config.js_compile.core) js_compile.core = config.js_compile.core;
if(config.js_compile.plugins) js_compile.plugins = config.js_compile.plugins;
if(config.js_compile.elements) js_compile.elements = config.js_compile.elements;


// MASTER ROUTE PROJECTS
if(!arg.p && master_compiler) {
log('Please choose project or turn of master compiler!!!');
exports.default =  gulp.series(helpMe);
return;
}



// PRIMITIVE FUNCTIONS
// ############################################################################

// CHECK FILE
function checkFile(a) {
  b = 0
  try {
    if (fs.existsSync(a)) {
      b = 1;
    }
  } catch(err) {
    log('[CHECK FILE] ' + lexicon.not_found + a);
    log(err);
  }
  return b;
}

// COPY FILE
function copyFile(a,b) {
    log('[COPY FILE] ' + a + ' -> ' + b);
    return gulp.src(a).pipe(gulp.dest(b));
}

// COPY FILE WITH DELAY
function copyFileDelay(a,b,c=options.delay) {
    log('[COPY FILE DELAY] ' + a + ' -> ' + b + ' ' + lexicon.with_delay + ': ' + c);
    return gulp.src(a).pipe(gulp.dest(b)).pipe(wait(c));
}

// COPY FILE WITH EXTENSION CHANGE
function copyFileExt(a,b,c) {
    log('[COPY FILE EXT] ' + a + ' -> ' + b);
    return gulp.src(a).pipe(rename({ extname:  c})).pipe(gulp.dest(b));
}

// COPY FILE RENAME
function copyFileRen(a,b,c) {
    log('[COPY FILE REN] ' + a + ' -> ' + b);
    return gulp.src(a).pipe(rename({ basename:  c})).pipe(gulp.dest(b));
}

// COPY IMAGES
function copyFileImg(a,b) {
    log('[COPY IMAGES] ' + a + ' -> ' + b);
    return gulp.src( a + '**/*.{' + options.image_formats + '}' )
        .pipe(imagemin())
        .pipe(gulp.dest(b));
}

// COPY BOOTSTRAP
function copyFileBs(a,b) {
    log('[COPY BOOTSTRAP] ' + a + ' -> ' + b);
    return gulp.src(a)
           .pipe(replace('@import "', '@import "' + path_rel.bootstrap))
           .pipe(replace('@import "' + path_rel.bootstrap + 'variables', '@import "variables'))
           .pipe(gulp.dest(b));
}

// COPY BOOTSTRAP VARIABLES
function copyFileBsv(a,b) {
    if(config.fonts.sansserif) {
      var tmpfontvar = config.fonts.sansserif.split(':');
      var tmpfont = "'" + tmpfontvar[0].replace('+',' ') + "', ";
    } else {
      var tmpfont = '';
    }
    log('[COPY BOOTSTRAP VAR] ' + a + ' -> ' + b + ' / Base font: ' + tmpfont );
    return gulp.src(a)
           .pipe(replace('-apple-system', tmpfont + '-apple-system'))
           .pipe(gulp.dest(b));
}
// COPY FONT AWESOME
function copyFileFa(a,b,c=path.dist) {
    log('[COPY FONT AWESOME] ' + a + ' -> ' + b);
    var c1 = c.replace(proot,'');
    return gulp.src(a)
           .pipe(replace("url('..", "url('/" + c1 ))
           .pipe(rename({ extname: ".scss"}))
           .pipe(gulp.dest(b));
}

// ZIP
function makeZip(a,b,c) {
    log('[ZIP] ' + a + ' -> ' +  b  + c +'.zip');
    return gulp.src(a)
           .pipe(zip( c + '.zip'))
           .pipe(gulp.dest(b));
}

//FTP FUNCTIONS
function uploadFtp(a,b=false,f=false) {
  if(config.server.host && config.login.user && config.login.password) {
    var ftp_base = '.';
    if (proot) { ftp_base = './' + proot; }
    ftp_session = {
        host:     config.server.host,
        user:     config.login.user,
        password: config.login.password,
        port: config.server.port,
        secure:    config.server.secure,
        parallel: config.server_options.parallel,
        maxConnections: config.server_options.maxConnections,
        log:      log
    };

      var conn = ftp.create( ftp_session );
      // using base = '.' will transfer everything to /public_html correctly
      // turn off buffering in gulp.src for best performance
      return gulp.src( a, { base: ftp_base, buffer: false } )
          .pipe(gulpif(b, conn.newer( config.server.folder ))) // only upload newer files
          .pipe( conn.dest( config.server.folder ) );

  }
      //log('FTP DISABLED');
      return Promise.resolve(function(resolve, reject) {
        resolve();
      });
}

// CSS COMPILER
function buildCss(a,b,c=false,d=false) {
      log('[CSS] ' + lexicon.building + ' css: ' + a + ' -> ' +  b);
      var cc = true;
      if(c) { cc = false; }
      return gulp.src([ a +  '*.scss', '!' + '_*.scss' ])
          .pipe(gulpif(c, sourcemaps.init()))
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss([ autoprefixer()]))
          .pipe(gulpif(cc, gulp.dest(b)))
          .pipe(gulpif(c, cleanCss()))
          .pipe(gulpif(c, rename({suffix: '.min'})))
          .pipe(gulpif(c, sourcemaps.write(path_rel.maps_rel)))
          .pipe(gulpif(c, gulp.dest(b)))
          .pipe(gulpif(d, browserSync.stream({match: '**/*.css'})));
}

// JAVASCRIPT COMPILER
function buildJs(a,b,c=false,d=false) {
  log('[JS] '+ lexicon.building +' js file: ' + a + ' -> ' +  b);
  var cc = true;
  if(c) { cc = false; }
    return gulp.src([ a +  '*.js' ])
       .pipe(gulpif(cc, gulp.dest(b)))
       .pipe(gulpif(c, sourcemaps.init()))
       .pipe(gulpif(c, terser()))
       .pipe(gulpif(c, rename({suffix: '.min'})))
       .pipe(gulpif(c, sourcemaps.write(path_rel.maps_rel)))
       .pipe(gulpif(c, gulp.dest(b)))
       .pipe(gulpif(d, browserSync.stream({match: '**/*.js'})));
}

// JAVASCRIPT FOLDER COMPILER
function buildJsFolder(a,b,c,d=false,e=false) {
    log('[JS] ' + lexicon.building + ' js folder: ' + a + ' -> ' +  b);
    var cc = true;
    if(c) { cc = false; }
    return gulp.src( a + '*.js' )
        .pipe(order([
          "*jquery.js",
          "*popper.js",
          "*bootstrap.js",
          "*bootstrap.bundle.js",
          "*.js"
        ]))
       .pipe(gulpif(c, sourcemaps.init()))
       .pipe(concat( c + '.js'))
       .pipe(gulpif(cc, gulp.dest(b)))
       .pipe(gulpif(d, terser()))
       .pipe(gulpif(d, rename({suffix: '.min'})))
       .pipe(gulpif(d, sourcemaps.write(path_rel.maps_rel)))
       .pipe(gulpif(d, gulp.dest(b)))
       .pipe(gulpif(e, browserSync.stream({match: '**/*.js'})));
}

// GOOGLE FONTS CREATE
function createGoogleFonts(a,b=false,c=config.sync.fonts) {
  if (c && a) {
    var gfonts_url = options.gfont_url.split('|');
    var online_fonts = gfonts_url[0];
    var local_fonts = "";
    log('[GFONTS] Preparing: ');
    for (var i in a) {
      online_fonts += a[i] + "|";
      local_fonts += a[i];
      if(b) {
        //subset
        local_fonts +=  gfonts_url[1] + b;
      }
      local_fonts += "\n";
      log('[GFONTS] Added font: ' + a[i]);
    }
    online_fonts = online_fonts.replace(/(\|$)/g, "");
    if(b) {
      log('[GFONTS] Using subset: ' + b);
      online_fonts +=  gfonts_url[1] + b;
    }
    online_fonts += gfonts_url[2];


    if(checkFile(path_abs.fonts_scss)) {
      log('[GFONTS] Creating backup of previous: ' + path_abs.fonts_old);
      copyFile(path_abs.fonts_scss, path.scss, path_name.fonts_old);
    }

    if(checkFile(path_abs.source)) {
      log('[GFONTS] Creating: ' + path_abs.gfonts);
      fs.writeFileSync(path_abs.gfonts, local_fonts);
    } else {
      log('[GFONTS] ERROR Missing: ' + path_abs.source);
      log('[GFONTS] Could not create: ' + path_abs.gfonts);
    }

    if(checkFile(path_abs.scss)) {
      log('[GFONTS] Creating: ' + path_abs.fonts_scss);
      log('[GFONTS] Creating backup: ' + path_abs.fonts_bak);
      fs.writeFileSync(path_abs.fonts_scss, online_fonts);
      fs.writeFileSync(path_abs.fonts_bak, online_fonts);
    } else {
      log('[GFONTS] ERROR Missing: ' + path_abs.scss);
      log('[GFONTS] Could not create: ' + path_abs.fonts_scss);
    }

    setTimeout(function(){
    }, options.delay);

    log('[GFONTS] Created: ' + local_fonts);

  } else {
    log('[GFONTS] Disabled... ');
    if(checkFile(path_abs.scss)) {
      if(checkFile(path_abs.fonts_scss)) {
        log('[FONTS] Font file already in place: ' + path_abs.fonts_scss);
      } else {
        log('[FONTS] Creating empty font file: ' + path_abs.fonts_scss);
        fs.writeFileSync(path_abs.fonts_scss, '');
      }
    } else {
      log('[FONTS] ERROR Missing: ' + path_abs.scss);
      log('[FONTS] Could not create: ' + path_abs.fonts_scss);
    }
  }


  return Promise.resolve(function(resolve, reject) {
    resolve();
  });
}

// GOOGLE FONTS DOWNLOAD
function downloadGoogleFonts(a,b,c=config.sync.fonts_local,d=config.sync.fonts) {
  if(c && d) {
    log('[GFONTS] Download font files localy: ' +  b);
    return gulp.src(a)
  		.pipe(googleWebFonts())
  		.pipe(gulp.dest(b));
  } else {
    // do nothing
    if(d) {
      log('[GFONTS] Use online fonts');
    }
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}

// GOOGLE FONTS CLEAN
function cleanupGoogleFonts(a,b,d=config.sync.fonts,c=config.sync.fonts_local) {
   if(c && d) {
     log('[GFONTS] Cleanup: ' + a + ' -> ' +  b);
     var d1 = d.split('.');
     var a1 = a.replace(proot,'');
     return gulp.src(a + 'fonts.css')
            .pipe(replace('url(', 'url(/' + a1))
            .pipe(rename({basename: d1[0], extname:  '.' + d1[1]}))
            .pipe(gulp.dest(b));
   } else {
     return Promise.resolve(function(resolve, reject) {
       resolve();
     });
   }
}

// HELP
function helpMe() {
  var run_path = root + file_name.help;
  if(checkFile(run_path)) {
    var help = fs.readFileSync(run_path,{encoding: options.encoding, flag: 'rs'});
  } else {
    var help = '[HELP] ' + lexicon.no_help + lexicon.please_check + run_path;
  }
  log(help);
  return Promise.resolve(function(resolve, reject) {
    resolve();
  });
}



// FUNCTION CALLS
// ############################################################################

// Presets
function createPresets() {
  if(config.sync.presets) {
    log('[PRESETS] Copy: ' + path.presets + ' -> ' + path.theme);
    return   copyFile( path.presets + '**/*', path.theme);
  } else {
    log('[PRESETS] disabled');
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}

// Vendors
function createVendors() {
  if(config.sync.vendors) {
    log('[VENDORS] Bootstrap, jQuery, Popper' + path.node + 'popper.js/dist/popper.min.js');
    return   copyFileDelay(path.node + 'bootstrap/scss/**/*', path.scss + 'bootstrap/'),
             copyFileDelay(path.node + 'bootstrap/dist/js/bootstrap.bundle.js', path.js + 'core/'),
             copyFileDelay(path.node + 'jquery/dist/jquery.js', path.js + 'core/');
             //copyFileDelay(path.node + 'popper.js/dist/popper.min.js', path.js + 'core/');
             // *** Add more vendors...
  } else {
    log('[VENDORS] disabled');
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}

// Bootstrap
function createBootstrap() {
  if(config.sync.bootstrap) {
    log('[BOOTSTRAP] Setting project: ' + path.presets + ' -> ' + path.theme);
    return   copyFileBsv(path.bootstrap + '_variables.scss',path.scss),
             copyFileBs(path.bootstrap + 'bootstrap.scss',path.scss);
  } else {
    log('[BOOTSTRAP] disabled');
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}


// SETUP EXTRAS
function createExtras() {
  if(config.sync.extras) {
    log('[EXTRAS] AOS, FontAwesome');
    return   copyFileDelay(path.node + '/aos/dist/aos.js', path.js + 'plugins/'),
             copyFileExt(path.node + '/aos/dist/aos.css', path.scss + 'plugins/','.scss'),
             copyFileDelay(path.node + '/font-awesome/fonts/**/*', path.fonts),
             copyFileFa(path.node + '/font-awesome/css/font-awesome.css', path.scss + 'plugins/');
             // *** Add more extras above...
  } else {
    log('[EXTRAS] disabled');
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}


function createFonts() {
  if(config.fonts) {
    log('[FONTS] Creating fonts');
    return  createGoogleFonts(config.fonts, config.fonts_subset),
            downloadGoogleFonts(path.gfonts, path.fonts);
  } else {
    log('[FONTS] disabled');
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}
function cleanupFonts() {
  if(config.fonts) {
    log('[FONTS] Cleaning fonts');
    return  cleanupGoogleFonts(path.fonts, path.scss, file_name.fonts_scss);
  } else {
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}

// CSS COMPILER FUNCTIONS
function compileCss() {
  if(config.sync.css) {
      return buildCss(path.scss,path.css,config.sync.min,config.sync.browser);
  } else {
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}

// CSS COMPILER FUNCTIONS
function compileJs() {
  if(config.sync.js) {
  return   buildJs(path.js,path.jsm,config.sync.min,config.sync.browser),
           buildJsFolder(path.js + js_compile.core + '/',path.jsm,js_compile.core,config.sync.min,config.sync.browser),
           buildJsFolder(path.js + js_compile.plugins + '/',path.jsm,js_compile.plugins,config.sync.min,config.sync.browser),
           buildJsFolder(path.js + js_compile.elements + '/',path.jsm,js_compile.elements,config.sync.min,config.sync.browser);
  } else {
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}



// OPTIMISE IMAGES
function compileImages() {
  if(config.sync.img) {
  return   copyFileImg(path.images,path.img);
  } else {
    return Promise.resolve(function(resolve, reject) {
      resolve();
    });
  }
}

// OPTIMISE MEDIA
function compileMedia() {
  if(config.sync.media) {
return   copyFileImg(path.media_source,path.media);
} else {
  return Promise.resolve(function(resolve, reject) {
    resolve();
  });
}
}

// SYNC DIST
function ftpDist() {
  if(config.sync.ftp) {
  var a = [
      path.dist + '**',
      '!*.DS_Store'
  ];
  var force = true;
  if (arg.f) force = false;
  return uploadFtp(a,true);
} else {
  return Promise.resolve(function(resolve, reject) {
    resolve();
  });
}
}

// SYNC ROOT
function ftpRoot() {
  if(config.sync.ftp) {
  var a = [
      path.root + '**',
      '!*.DS_Store',
      '!node_modules*',
      '!*gulpfile*',
      '!*package*',
  ];
  var force = true;
  if (arg.f) force = false;
  return uploadFtp(a,force);
} else {
  return Promise.resolve(function(resolve, reject) {
    resolve();
  });
}
}

// SYNC MEDIA
function ftpMedia() {
  if(config.sync.ftp) {
  var a = [
      path.media + '**',
      '!*.DS_Store'
  ];
  return uploadFtp(a,true);
} else {
  return Promise.resolve(function(resolve, reject) {
    resolve();
  });
}
}

// BACKUP THEME
function zipTheme() {
  var b =  config.name.replace(" ", "") + '_' + path_name.source + '_' + now_year + now_month + now_date ;
  return   makeZip(path_abs.source + '**/*', path.backup,b);
}

// BACKUP PROJECT
function zipProject() {
  var a = [
    path_abs.root + '**/*',
    '!node_modules/**/*',
    '!backup/**/*'
  ];
  var b =  config.name.replace(" ", "") + '_' + now_year + now_month + now_date;
  return   makeZip(a,path.archive,b);
}


// WATCHER
function watcher() {

  if (config.sync.browser) {
      if (config.sync.browser_online && config.server.url) {
        browserSync.init({
          proxy: config.server.url,
          serveStatic: [{
               route: '/' + path.dist,
               dir: './'  + path.dist
           }]
        });
      } else {
        browserSync.init({
             server: {
                 baseDir: path_abs.root
             }
         });
      }
  }
    gulp.watch([ path.theme + '**/*.scss'], { queue: false }, gulp.series(compileCss,ftpDist));
    gulp.watch([ path.theme + '**/*.js'],  { queue: false }, gulp.series(compileJs,ftpDist)).on('change', browserSync.reload);
    gulp.watch([ path.theme + '**/*.{' + options.image_formats + '}'], { queue: false }, gulp.series(compileImages,ftpDist)).on('change', browserSync.reload);
    gulp.watch(path.root + '**/*.html').on('change', browserSync.reload);
}

// TASKS
// ############################################################################

// CREATE
exports.project = gulp.series(createPresets,createVendors,createBootstrap,createExtras,createFonts,cleanupFonts);
exports.presets = gulp.series(createPresets);
exports.vendors = gulp.series(createVendors);
exports.extras = gulp.series(createExtras);
exports.bootstrap = gulp.series(createBootstrap);
exports.fonts = gulp.series(createFonts,cleanupFonts);

// COMPILE
exports.compile = gulp.series(compileCss,compileJs,compileImages);
exports.css = gulp.series(compileCss);
exports.js = gulp.series(compileJs);
exports.img = gulp.series(compileImages);

// UPLOAD
exports.sync = gulp.series(ftpDist);
exports.syncall = gulp.series(ftpRoot);
exports.syncmedia = gulp.series(ftpMedia);

// BACKUP
exports.backup = gulp.series(zipTheme);
exports.archive = gulp.series(zipProject);

exports.help =  gulp.series(helpMe);
exports.watch = gulp.series(watcher);
exports.default =  gulp.series(helpMe);
