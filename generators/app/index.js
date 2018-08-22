var Generator = require('yeoman-generator');
var fs = require('fs');
var colors = require('colors');
var requestSync = require('sync-request');
var beautify = require('js-beautify').js_beautify;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('skip-install');
    this.option('skip-repo');
  }
  initializing() {
  }
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
          return input !== '';
        }
      }, {
        type: 'input',
        name: 'author',
        message: 'Author? (optional) `Name <email>`'
      }, {
        type: 'input',
        name: 'template',
        message: 'Would you like to use the basic or advanced template? [enter \'basic\' or \'advanced\']\n\n'
        + 'The basic template only uses HTML, JavaScript and CSS, with some minimal postprocessing. None of the fancy stuff.\n\n'
        + 'The advanced template uses Handlebars, SCSS, judicious use of AJAX loads, supports writing content in Markdown and .docx formats and has more thorough URL substitution. It\'s based directly on the wiki Virginia iGEM made in 2018.\n',
        validate: function(input) {
          return input === 'basic' || input === 'advanced';
        },
        default: 'basic'
      }];

      if (!this.options['skip-repo']) {
        questions.push({
          type: 'input',
          name: 'repo',
          message: 'What is the GitHub repository for this project? (Provided as ' + 'username/repo'.magenta + ')',
          validate: function (input) {
            var good = false;
            for (var i = 0; i < input.length; i++) {
              if (input[i] === '/' && good === false) {
                good = true;
              } else if (input[i] === '/' && good === true) {
                good = false;
                return;
              }
            }

            if (!good)
              return 'Follow ' + 'username'.magenta + '/' + 'repo'.magenta + ' format.';

            var base_url = 'https://github.com/';

            var httpResponse = requestSync('GET', base_url + input);

            if (httpResponse.statusCode === 200) {
              return true;
            } else if (httpResponse.statusCode === 404) {
              return 'Nice try, the page ' + base_url.blue + input.blue + ' returned a ' + '404'.red;
            } else {
              return false;
            }
          }
        });
      }

      return this.prompt(questions).then(function(answers) {
        this.config.set({
          year: answers.year,
          teamName: answers.teamName,
          repo: answers.repo ? 'https://github.com/' + answers.repo : '',
          author: answers.author,
          template: answers.template + '/'
        });
        //this.config.save();
        resolve();
      }.bind(this));

    });}
  configuring() {
    this.log('configuring');
  }
  default() {
    this.log('default');
  }
  writing() {
    this.log('writing');
    // Copy bower.json
    this.fs.copyTpl(
      this.templatePath(this.config.get('template') + 'bower.json'),
      this.destinationPath('bower.json'),
      this.config.getAll()
    );
    // Copy gulpfile.js
    this.fs.copyTpl(
      this.templatePath('common/gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      this.config.getAll()
    );
    // Copy package.json
    this.fs.copyTpl(
      this.templatePath(this.config.get('template') + 'package.json'),
      this.destinationPath('package.json'),
      this.config.getAll()
    );
    // Copy README.md
    this.fs.copyTpl(
      this.templatePath('common/README.md'),
      this.destinationPath('README.md'),
      this.config.getAll()
    );
    // Copy .gitignore
    this.fs.copyTpl(
      this.templatePath('common/gitignore'),
      this.destinationPath('.gitignore')
    );
    // Copy .gitignore
    this.fs.copyTpl(
      this.templatePath('common/.gitattributes'),
      this.destinationPath('.gitattributes')
    );
    // Copy all of app
    this.fs.copy(
      this.templatePath(this.config.get('template') + 'app'),
      this.destinationPath('app')
    );
    // Copy all of gulp
    this.fs.copy(
      this.templatePath('common/gulp'),
      this.destinationPath('gulp')
    );
    // Copy config.json
    this.fs.copyTpl(
      this.templatePath('common/config.js'),
      this.destinationPath('config.js'),
      this.config.getAll()
    );
  }
  install() {
    this.log('install');
    // Replace author in package with author entered
    var pkg = JSON.parse(fs.readFileSync('package.json'));
    pkg.author = this.config.get('author');
    fs.writeFileSync('package.json', beautify(JSON.stringify(pkg)));

    if (this.options['skip-install']) {
      this.log('Skipping ' + 'npm install'.magenta + ' and ' + 'bower install'.magenta + '. Run these yourself.');
    } else {
      // Explicitly install wikibrick to bypass errors with npm
      // dependency resolution
      this.installDependencies();
      this.npmInstall(['igem-wikibrick'], {'dev': true});
    }
  }
  conflicts() {
    this.log('conflicts');
  }
  end() {
    this.log('Good Bye!');
  }
};
