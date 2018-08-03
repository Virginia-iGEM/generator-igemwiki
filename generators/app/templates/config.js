const path = require('path');

// Look for build environment flags
var argv = require('yargs')
    .boolean(['--dev', '-d'])
    .boolean(['--live', '-l'])
    .argv;

module.exports = function (root) {
    // ========================== //
    // Build Environment Settings //
    // ========================== //

    // Set build flags flags. These change the way the build occurs depending on the environment.
    var environments = {
        dev: {
            banner: false,
            minify: false,
            relative2absolute: false,
            serve: true
        },
        live: {
            banner: true,
            minify: true,
            relative2absolute: true,
            serve: false
        }
    }

    // Process the shortflags -l and -d
    var shortflag;
    if (argv.l) {
        shortflag = 'live'
    }
    else if (argv.d) {
        shortflag = 'dev'
    }

    // Set fallback logic for environmental variables
    var userenv = argv.env || shortflag || 'dev'; // Try env variable, else fallback on shortflag, else assume we're in dev
    var environment = Object.assign(environments[userenv], { name: userenv });

    // ===================================== //
    // Paths, Sources, Destinations and URLs //
    // ===================================== //

    // Set the source and destination directories for build
    var app = path.join(root, '/app/');
    var build = path.join(root, '/build/');

    // Teaminfo. Used mainly for URL Substitution.
    const teaminfo = {
        year: <%= year %>,
        teamName: <%= teamName %>
  }

    // Listed file sources for all tasks. Note use of glob patterns and wildcarding.
    // Used by any build tasks.
    var buildsrc = {
        htmlpages: [path.join(app, '**/*.html'),
        path.join('!', app, '{templates,partials,content}/**/*.html')],
        hbspages: [path.join(app, '**/*.hbs'),
        path.join('!', app, '{templates,partials,content}/**/*.hbs')],
        htmlcontent: path.join(app, 'content/**/*.html'),
        markdowncontent: path.join(app, 'content/**/*.md'),
        docxcontent: path.join(app, 'content/**/*.docx'),
        //drivecontent: TODO,
        partials: path.join(app, 'partials/'),
        templates: path.join(app, 'templates/**/*.html'),
        css: path.join(app, 'styles/**/*.css'),
        scss: path.join(app, 'styles/**/*.scss'),
        js: path.join(app, 'scripts/**/*.js'),
        images: path.join(app, 'images/**/*.{png,jpg}'),
        fonts: path.join(app, 'fonts/**/*.{ttf,otf,woff}')
    }

    // Destination directory for build, source directories for upload.
    // Used by any build tasks.
    var buildtarget = {
        pages: build,
        templates: path.join(build, 'templates/'),
        content: path.join(build, 'content/'),
        css: path.join(build, 'css/'),
        js: path.join(build, 'js/'),
        bowerjs: path.join(build, 'dist/js/'),
        bowercss: path.join(build, 'dist/css/'),
        images: path.join(build, 'images/'),
        fonts: path.join(build, 'fonts/')
    }

    // Used by push.js. Note that for the most part, 
    // upload srcs are the same as built targets, and so we build them out of our
    // build targets.
    var uploadsrc = {
        index: path.join(buildtarget.pages, 'index.html'),
        pages: [path.join(buildtarget.pages, '*.html'), path.join('!', buildtarget.pages, 'index.html')],
        templates: path.join(buildtarget.templates, '*.html'),
        content: path.join(buildtarget.content, '*.html'),
        css: path.join(buildtarget.css, '*.css'),
        js: path.join(buildtarget.js, '*.js'),
        bowerjs: buildtarget.bowerjs.concat('**/*.js'),
        bowercss: buildtarget.bowercss.concat('**/*.css'),
        files: [path.join(build, 'images/**/*.{png,jpg}'), path.join(build, 'fonts/**/*.{ttf,otf,woff}')]
    }

    // Which directory should we recursively delete in order to clean out the build?
    var clean = path.join(build, '/**');

    // File where URLs for uploaded images are stored.
    var uploadmap = path.join(root, 'uploadmap.json');

    // Compound tasks must be included in gulpfile for Gulp 4 and so have been 
    // deprecated. Include compound tasks in your gulpfile.js following unit
    // task loads.
    var gulp = {
        unit: './gulp/tasks/unit/*.js',
        //compound: './gulp/tasks/compound/*.js' 
    }

    // Change to 's' to enable secure html
    // Warning: Should not be used for production iGEM wikis. iGEM HQ currently
    // does not support the HTTPS protocol.
    var secure = '';

    // URLs used by realtive2absolute
    var urls = {
        standard: `http${secure}://${teaminfo.year}.igem.org/Team:${teaminfo.teamName}`,
        template: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.teamName}`,
        js: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.teamName}/js`,
        css: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.teamName}/css`,
        files: `http${secure}://${teaminfo.year}.igem.org/File:T--${teaminfo.teamName}--{0}`,
    }

    // Suffixes used by relative2absolute
    var suffixes = {
        js: '?action=raw&ctype=text/javascript',
        css: '?action=raw&ctype=text/css'
    }

    // A glossary used for our tooltipping function. Feel free to remove this
    // if you don't want tooltips.
    const glossary = {
        "quorum sensing": ["In biology, quorum sensing is the ability to detect and to respond to cell population density by gene regulation.", "Long Def"],
        "operon": ["In genetics, an operon is a functioning unit of DNA containing a cluster of genes under the control of a single promoter.", "Long Def"],
        "Lsr operon": ["Short Def", "Long Def"],
        "E.coli": ["E. coli (Escherichia coli) is one of several types of bacteria that normally inhabit the intestine of humans and animals.", "Long Def"],
        "biofilms": ["ggregate of microorganisms in which cells that are frequently embedded within a self-produced matrix of extracellular polymeric substances (EPSs) adhere to each other and/or to a surface.", "LD"],
        "virulence": ["Virulence provides a quantitative measure of the pathogenicity or the likelihood of a microbe to cause disease.", "LD"],
        "Autoinducer-2": ["A member of a family of signaling molecules used in quorum sensing.", "LD"],
        "phosphorylation": ["A biochemical process that involves the addition of phosphate to an organic compound. ", "LD"],
        "pLsr": ["A promoter of the Lsr Operon", "LD"],
        "T7 RNA Polymerase": ["A RNA polymerase from the T7 bacteriophage that catalyzes the formation of RNA from DNA in the 5'→ 3' direction.", "LD"],
        "LsrK": ["SD", "LD"],
        "LsrACDB": ["SD", "LD"],
        "LuxS": ["SD", "LD"],
        "YdgG": ["SD", "LD"],
        "sfGFP": ["SD", "LD"],
        "autoinduction": ["The induction of something by itself or without external stimuli.", "LD"]
    }

    // Handlebars helper functions are defined here. These can be used with
    // the curlybracket {{helpername arg1 arg2}} notation in either content/*
    // files or app/*.hbs files.
    var handlebarsHelpers = function (file, t) {
        return {
            // Substitute in the necessary boilerplate for AJAX loading content files
            // with the same name as the page this function is included on.
            contentpath: function (context) {
                return path.posix.join('/content/', path.basename(file.path));
            },
            // Use {{define word}} to automatically create tooltips for words. Uses
            // in-build substitution
            define: function (context) {
                if (context in glossary) {
                    var word_short_definition = glossary[context][0];
                    var word_long_definition = glossary[context][1];
                    return `<span class="tooltip">${context}<span class="shortdef">${word_short_definition}</span><span class="longdef" tabindex = "1">${word_long_definition}</span> </span>`;
                }
                else {
                    return context;
                }
            }
        }
    }

    // Options passed into the markdown parser. Currently set
    // to not sanitize HTML
    var markdownOptions = {
        sanitize: false
    }

    // Collect all variables created into an object and export it for use by 
    // various scripts.
    return {
        teaminfo: teaminfo,
        uploadmap: uploadmap,
        gulp: gulp,
        environment: environment,
        environments: environments,
        targets: {
            root: root,
            clean: clean,
            app: app,
            build: build,
            buildsrc: buildsrc,
            buildtarget: buildtarget,
            uploadsrc: uploadsrc,
            urls: urls,
            suffixes: suffixes,
        },
        browsersync: {
            development: {
                server: build,
                port: 9999
            }
        },
        handlebars: {
            helpers: handlebarsHelpers
        },
        markdown: {
            options: markdownOptions
        },
        browserslist: ["defaults"]
    };
};
