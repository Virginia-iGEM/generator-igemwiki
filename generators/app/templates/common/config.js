const path = require('path');

var argv = require('yargs')
    .boolean(['--dev', '-d'])
    .boolean(['--live', '-l'])
    .argv;

module.exports = function(root) {
    var app = path.join(root, '/app/');
    var build = path.join(root, '/build/');

    // Teaminfo. Duh.
    const teaminfo = {
        year: 2018,
        teamName: 'Virginia'
    };

    const imagetypes = '{png,jpg,gif,svg}';
    const fonttypes = '{ttf,otf,woff}';

    // Listed file sources for all tasks. Note use of glob patterns and wildcarding.
    // Used by any build tasks.
    var buildsrc = {
        htmlpages: [path.join(app, '**/*.html'), path.join('!', app, '{templates,partials,content}/**/*.html')],
        hbspages: [path.join(app, '**/*.hbs'), path.join('!', app, '{templates,partials,content}/**/*.hbs')],
        htmlcontent: path.join(app, 'content/**/*.html'),
        markdowncontent: path.join(app, 'content/**/*.md'),
        docxcontent: path.join(app, 'content/**/*.docx'),
        //drivecontent: TODO,
        partials: path.join(app, 'partials/'),
        templates: path.join(app, 'templates/**/*.html'),
        css: path.join(app, 'styles/**/*.css'),
        scss: path.join(app, 'styles/**/*.scss'),
        js: path.join(app, 'scripts/**/*.js'),
        images: path.join(app, `images/**/*.${imagetypes}`),
        fonts: path.join(app, `fonts/**/*.${fonttypes}`)
    };

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
    };

    // Used by push.js. Note that for the most part, 
    // upload srcs are the same as built targets.
    var uploadsrc = {
        index: path.join(buildtarget.pages, 'index.html'),
        pages: [path.join(buildtarget.pages, '*.html'), path.join('!', buildtarget.pages, 'index.html')],
        templates: path.join(buildtarget.templates, '*.html'),
        content: path.join(buildtarget.content, '*.html'),
        css: path.join(buildtarget.css, '*.css'),
        js: path.join(buildtarget.js, '*.js'),
        bowerjs: buildtarget.bowerjs.concat('**/*.js'),
        bowercss: buildtarget.bowercss.concat('**/*.css'),
        files: [path.join(build, `images/**/*.${imagetypes}`), path.join(build, `fonts/**/*.${fonttypes}`)]
    };

    var secure = ''; // Change to 's' to enable secure html
    // URLs used by realtive2absolute
    var urls = {
        standard: `http${secure}://${teaminfo.year}.igem.org/Team:${teaminfo.teamName}`,
        template: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.teamName}`,
        js: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.teamName}/js`,
        css: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.teamName}/css`,
        files: `http${secure}://${teaminfo.year}.igem.org/File:T--${teaminfo.teamName}--{0}`,
    };

    // Suffixes used by relative2absolute
    var suffixes = {
        js: '?action=raw&ctype=text/javascript',
        css: '?action=raw&ctype=text/css'
    };

    var environments = {
        dev: {
            banner: false,
            minify: false,
            relative2absolute: false,
            serve: true,
            debug: true,
            browserify: true,
            importantify: false
        },
        live: {
            banner: true,
            minify: false,
            relative2absolute: true,
            serve: false,
            debug: false,
            browserify: true,
            importantify: false
        }
    };

    var shortflag;
    if (argv.l) {
        shortflag = 'live';
    }
    else if (argv.d) {
        shortflag = 'dev';
    }

    var userenv = argv.env || shortflag || 'dev'; // Try env variable, else fallback on shortflag, else assume we're in dev
    var environment = Object.assign(environments[userenv], {name: userenv});

/*tooltip*/
    const glossary = {
        "Autoinducer-2": ["A universal signaling molecule used by microorganisms to coordinate group behavior through quorum sensing."],
        "autoinduction": ["The activation of a phenotype without external stimuli."],
        "biofilms": ["A protective, adhesive matrix of polymers typically produced after quorum activation."],
        "E.coli": ["Escherichia coli. A commonly used chassis also found in the human gut microbiome."],
        "LsrACDB": ["Active import protein for AI-2."],        
        "LsrK": ["AI-2 kinase, which catalyzes the phosphorylation of A1-2 to phospho-AI-2."],        
        "Lsr operon": ["LuxS Regulated (Lsr) operon responsive to AI-2."], 
        "LuxS": ["An enzyme closely linked to the production of AI-2."],
        "operon": ["A functional unit of DNA containing a cluster of genes under the control of a single promoter."],
        "phosphorylation": [" The addition of a phosphate group to an organic compound. "],
        "pLsr": ["The bidirectional promoter of the Lsr Operon."],
        "quorum sensing": ["The ability to detect and to respond to cell population density by gene regulation."],
        "sfGFP": ["superfolding Green Fluorescent Protein"],
"T7 RNA Polymerase" : ["An RNA polymerase from the T7 bacteriophage is highly selective for the pT7 promoter."],     
        "virulence": ["The likelihood of a microbe to cause disease based on its phenotypic state."],
        "YdgG": ["Active export protein for AI-2."]  
    };

    var handlebarsHelpers = function(file, t) {

        return {
            contentpath: function(context) {
                return path.posix.join('/content/', path.basename(file.path));
            },
            define: function(context) {
                if (context in glossary) {
                    var word_short_definition = glossary[context][0];
                    var word_long_definition = glossary[context][1];
                    return `<span class="tooltip">${context}<span class="shortdef">${word_short_definition}</span><span class="longdef" tabindex = "1">${word_long_definition}</span> </span>`;
                }
                else {
                    return context;
                }
            }
        };
    };

    var markdownOptions = {
        sanitize: false
    };

    return {
        teaminfo: teaminfo,
        uploadmap: path.join(root, 'uploadmap.json'),
        gulp: {
            unit: './gulp/tasks/unit/*.js',
            compound: './gulp/tasks/compound/*.js'
        },
        environment: environment, // Default to development environment, otherwise whatever is passed in
        environments: environments,
        targets: {
            root: root,
            clean: path.join(build, '/**'),
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
