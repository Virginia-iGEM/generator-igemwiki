var Generator = require('yeoman-generator');
var fs = require('fs')
var colors = require('colors')
var requestSync = require('sync-request')
var beautify = require('js-beautify').js_beautify

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('skip-install')
        this.option('skip-repo')
    };
    initializing() {
        // this.log('destinationRoot', this.destinationRoot())
        // this.log('sourceRoot', this.sourceRoot())
    };
    prompting() {
    return new Promise((resolve, reject) => {
        var questions = [{
            type: 'input',
            name: 'year',
            message: 'What year is it?',
            default: (new Date()).getFullYear()
        }, {
            type: 'input',
            name: 'teamName',
            message: 'What is your team name ' + 'exactly'.red + ' as it appears on the wiki? (Team:' + 'teamName'.magenta + ')',
            validate: function (input) {
                if (input === '') {
                    return false
                } else {
                    return true
                }
            }
        }, {
            type: 'input',
            name: 'author',
            message: 'Author? (optional) `Name <email>`'
        }]

        if (!this.options['skip-repo']) {
            questions.push({
                type: 'input',
                name: 'repo',
                message: 'What is the GitHub repository for this project? (Provided as ' + 'username/repo'.magenta + ')',
                validate: function (input) {
                    var good = false
                    for (var i = 0; i < input.length; i++) {
                        if (input[i] === '/' && good === false) {
                            good = true
                        } else if (input[i] === '/' && good === true) {
                            good = false
                            return
                        }
                    }

                    if (!good)
                        return 'Follow ' + 'username'.magenta + '/' + 'repo'.magenta + ' format.'

                    base_url = 'https://github.com/'

                    var httpResponse = requestSync('GET', base_url + input)

                    if (httpResponse.statusCode === 200) {
                        return true
                    } else if (httpResponse.statusCode === 404) {
                        return 'Nice try, the page ' + base_url.blue + input.blue + ' returned a ' + '404'.red
                    } else {
                        return false
                    }
                }
            })
        }

        this.prompt(questions, function (answers) {
            this.config.set({
                year: answers.year,
                teamName: answers.teamName,
                repo: answers.repo ? 'https://github.com/' + answers.repo : '',
                author: answers.author
            })
            resolve()
        }.bind(this))

    })};
    configuring() {
        // this.log('configuring')
    };
    default() {
        // this.log('default')
    };
    writing() {
        // Copy bower.json
        this.fs.copyTpl(
            this.templatePath('bower.json'),
            this.destinationPath('bower.json'),
            this.config.getAll()
        )
        // Copy gulpfile.js
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            this.config.getAll()
        )
        // Copy package.json
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this.config.getAll()
        )
        // Copy README.md
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            this.config.getAll()
        )
        // Copy .gitignore
        this.fs.copyTpl(
           this.templatePath('.gitignore'),
           this.destinationPath('.gitignore')
        )
        // Copy .gitignore
        this.fs.copyTpl(
           this.templatePath('.gitattributes'),
           this.destinationPath('.gitattributes')
        )
        // Copy all of app
        this.directory('app', './app')
        // Copy all of gulp
        this.directory('gulp', './gulp')
        // Copy config.json
        this.fs.copyTpl(
            this.templatePath('config.json'),
            this.destinationPath('config.json'),
            this.config.getAll()
        )
    };
    install() {
        pkg = JSON.parse(fs.readFileSync('package.json'))
        pkg.author = this.config.get('author')
        fs.writeFileSync('package.json', beautify(JSON.stringify(pkg)))

        if (this.options['skip-install']) {
            this.log('Skipping ' + 'npm install'.magenta + ' and ' + 'bower install'.magenta + '. Run these yourself.')
        } else {
            // Explicitly install wikibrick to bypass errors with npm
            // dependency resolution
            this.installDependencies()
            this.npmInstall(['igem-wikibrick'], {'dev': true});
        }
    };
    conflicts() {
        //this.log('conflicts')
    };
    end() {
        this.log('Good Bye!')
    };
};
