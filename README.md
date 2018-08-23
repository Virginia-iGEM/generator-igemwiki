# generator-igemwiki

This tool is heavily inspired by Julian Mazzitelli's (iGEM Toronto 2016) [generator-igemwiki](https://github.com/igemuoftATG/generator-igemwiki), uses much of his code, builds on much of his work, and is an attempt at providing a stable and easily community-maintained package. Shout-out to Julian for making this tool a possibility and being an overall awesome guy.

## Description

`generator-igemwiki` is a [Yeoman generator](http://yeoman.io/); a tool that creates scaffolds for iGEM wikis for use with Virginia 2018's wiki build tool, [igem-wikibrick](https://github.com/Virginia-iGEM/igem-wikibrick).

In English: `generator-igemwiki` makes creating a professional, high-quality iGEM wiki quick and easy. This tool provides you with a highly flexible template that can be edited locally and offline: changes are rendered instantly in your web browser and all files can be uploaded automatically to the iGEM wiki.

Two templates are currently available: 

- The `basic` template includes only HTML, CSS and JavaScript. The build pipeline is fairly minimal and only includes some postprocessing, as well as Browserify, which we chose to include because it allows use of a more up-to-date version of JQuery (iGEM Wiki force-loads JQuery 1.11.1, Browserify lets us use JQuery 3.3.1 without conflict).
- The `advanced` template includes Handlebars, SCSS prepocessing, as well Markdown and .docx importing for content via AJAX loads. It is a direct clone of Virginia iGEM 2018's wiki at a certain commit, with no modifications. We welcome you to base your wiki design off of ours, in the spirit of open source, however, to avoid accusations of plaigirism, if you choose to use the advanced template you both _should_ and _must_ modify it heavily to fit your team's vision.

## Quickstart

For those who already have Node installed, know of Git and know their terminal:

```bash
npm install -g npm
npm install -g yo bower gulp@next https://github.com/Virginia-iGEM/generator-igemwiki
mkdir igem-2018-wiki
cd igem-2018-wiki
yo igemwiki
```

Note that we are using Gulp 4; keep this in mind when looking up Gulp recipes if you intend on modifying the build pipeline.

If that made no sense, please continue to [Installation and Setup](#installation-and-setup) for a full walkthrough.

## Installation and Setup

First, you must download and install the latest version of [Node.js](https://nodejs.org/en/) if you do not already have it installed. Node.js is a JavaScript interpreter (similar to the Python interpreter) that we use to run both the generator as well as to build the project.

Once you've downloaded Node.js, launch a terminal. On Windows, Powershell is our terminal of choice (Start Menu > Search > Powershell); as far as we are aware, cmd.exe will work as well, but we recommend Powershell. On Mac, we recommend [iTerm2](https://www.iterm2.com/), though the built-in Terminal should work just fine. On Linux, any modern BASH-like shell should work.

> If you are nervous about using the terminal, we have written a short [Introduction to the Terminal](https://github.com/Virginia-iGEM/2018-tutorials/tree/master/cli) article, specifically aimed at iGEM teams.

Now, we'll update `npm`, the Node.js package manager (like `apt` or `pip`) to the latest version, install `yo` (Yeoman), install `bower` (our live dependency manager), install `gulp@next` (gulp v4.0, which is the command-line task runner our build system uses), and `generator-igemwiki` (which is, of course, this generator):

```bash
npm install -g npm    # update npm to latest version
npm install -g yo bower gulp@next
npm install https://github.com/Virginia-iGEM/generator-igemwiki
```

Several pages of information should be logged. If these commands complete without errors, proceed to create a new folder that will hold all the code for your wiki. For example, mine is located in `C:\Users\Mantissa\Projects\igem-2018-wiki`; place it somewhere easy to access and find, such as your Documents, Desktop, or your Home folder on Unix.

If you'd like to do this through the terminal, the following series of commands should work:

```bash
cd ~                  # change dir to home
cd Documents          # optional; `cd Desktop` or `cd Projects` would also be good
mkdir 2018-igem-wiki  # replace 2018 with your year, of course
```

Now, we're going to enter this directory using the terminal. `cd` into the project folder:

```bash
cd ~/Documents/2018-igem-wiki   # This will take you to C:\Users\<your-username>\Documents\2018-igem-wiki
```

And once we're in the project folder, run `yo` (Yeoman):

```bash
yo igemwiki
```

Entering this command will prompt you for the current iGEM year, your team name (this must be **exactly** identical to how it appears on the URL of your wiki, including capitalization and punctuation. If it is not, the tool will not be able to upload your files and you will have to edit `config.js` later on), your name and email, and lastly a GitHub repository for your wiki.

---

A short aside: at this point, if you haven't already, we **strongly** recommend you start using Git to manage your project:

- [Download and install Git](https://git-scm.com/)
- Set up a [GitHub account](https://github.com/join) and a [GitHub organization for your team](https://www.sap.com/developer/tutorials/webide-github-creating-org.html)
- [Create a new GitHub repository for your wiki](https://help.github.com/articles/create-a-repo/). Note, when creating a new repository, do **NOT** check the **Initialize this repository with a README** even if the instructions say to, as we will be pushing an existing repository to GitHub later on.

Your project should now show up on the page for your GitHub repository.

While this may seem like a lot of setup, it doesn't take that long and learning how to use Git and GitHub will save you a lot of strife in the long run. If you've never heard of it before, Git is a Version Control System; this means that it keeps track of every `commit` you make to your project. Every `commit` is a collection of changes, which may include modifications to files, new files, or deleted files. Because it keeps track of these changes, Git can restore deleted files, or revert to old code in the event that a change was made that turned out to be unwanted. In the event that your computer is destroyed or rendered inoperable (trust me, it happens to the best of us), not only can other teammates keep a copy of all changes on their computer, but GitHub also has a copy of the changes and the project can be restored once your computer is working again.

Git has many other features beyond this, including: 
- Enabling multiple teammates to sanely work on the same file at the same time.
- Branches, which allow team members to split the codebase and merge later on to work on different features without trampling each others' work.
- Support for cloning and forking, which allows other teams to make use of your repository. We encourage you to read about these features and further understand Git as you use it.

If you do not use Git, or some other version control system, you may find yourself losing work, or perhaps your entire wiki without the ability to recover.

If you do not intend to use Git (not recommended), or are using some other kind of Version Control System, you can disable this (required) prompt with the `--skip-repo` flag.

---

Back to the tutorial. Once `yo igemwiki` finishes running, it will have created a bunch of folders in your project folder. It should look something like this:

![Generated Project](.tutorial/generated_project.PNG)

Currently only one template is available, and it is a mirror of the Virginia iGEM Wiki on August 2nd, 2018 at 3:01pm. In the future, we will add more generic templates with varying feature sets.

This generated project has the following properties:

- Development dependencies (external libraries needed for you to develop your wiki on your computer) are managed by `npm`; they are tracked in `package.json` and `package-lock.json`, and can be found in `node_modules`. If you need to install any new development dependencies, do so with `npm install -D <pakagename>` within your project folder.
- Live dependencies (external dependencies that need to be uploaded to the iGEM wiki to work) are managed by `bower`; they are tracked in `bower.json` and can be found in `bower_components`. If you need to install a package which must be uploaded to the iGEM wiki, you can do so with `bower install <packagename>`.
- The project uses Virginia 2018's home-made build tool, `igem-wikibrick`, which in turn makes use of Toronto 2016's `igemwiki-api`. What this means is that, like a C++ project, this project must be built to produce usable HTML, JS and CSS files. To do this, we use the commandline tool, `gulp`.
- The `app` folder contains all the source code for the wiki itself. 
  - _HTML_: `.hbs` files will be compiled to HTML files using Handlebars, using content that can be found in `partials`, which are baked-in at build time, and `content`, files which are compiled and loaded dynamically at load time using AJAX. Note `partials` and Handlebars helper functions can be used in `content` as well. Templates are treated similarly, except that they do not get Handlebars processing, and so they must be bare HTML.
  - _CSS_: `.scss` files, which can be found in the `styles` folder, will be compiled together using the rules of SASS to create a single `styles.css` folder that all pages use. Note that if you want to create separate files for different pages, this is entirely possible; just create new `.scss` files. The tool will also compile standard CSS files; just use the `.css` file ending and place them in `styles`.
  - _JavaScript_: `.js` files, which can be found in `scripts`. Currently we only have support for plain, standard browser JavaScript. All of the files in `scripts` will be concatenated together for build into a file named `wiki.js`, which is uploaded and referenced automatically by all pages. In the future we may move to `browserify`, which will allow `require()` statements in JS, enabling use of Node packages.
  - _Images_: Currently only .png and .jpg images are supported. Support for other kinds of images is entirely possible; just change the `buildsrc` and `uploadsrc` wildcard entries in `config.js` to find, for example, `.svg` files.
  - _Fonts_: Currently only `ttf`, `otf` and `woff` fonts are supported. If you need to add more, follow the same procedure as above.
- Custom `gulp` subtasks can be added to the gulp/unit folder. Note the example `example` task.
- Custom `gulp` tasks dependent on other gulp tasks can be added to `gulpfile.js`. Note the example `dummy` task.

At this point, you've installed all the necessary packages, and set up your project, and you can start working.

Before you move on, if you haven't already, you should commit your changes to Git and push to your repository:

- `git init` in your project folder to create a new GitHub repository
- `git add .` to add all the files currently in the repository
- `git commit -m "Initial commit"` to create your first commit
- `git remote add origin https://github.com/username/reponame` to link your repository to GitHub
- `git push -u origin master` to push your information to GitHub

## Usage

Once the project is set up, you are ready to use `igem-wikibrick`, our build-and-upload tool. See the [igem-wikibrick tutorial](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/tutorial)

## Documentation?

You might be thinking "For a tool this complex, this page is awfully sparse on documentation."

Because this is just a _generator_ wrapped around `igem-wikibrick`; most of our documentation and usage guides, including a detailed usage tutorial, migration guide, and programmer's guide with tool architecture, can be found on the [igem-wikibrick repository](https://github.com/Virginia-iGEM/igem-wikibrick/).

## Todo

- Fix _igemwiki-override.scss_ so that it actually corrects for the wiki styles and the published site reflects the local build site 1:1
- Update template so that instead of just being a clone of our wiki, it's a generic template
- Create multiple templates, ranging from simple (basic HTML, CSS and JS, for teams that just want the autoupload/URL Substitution/offline development features) to complex (Full SCSS, Handlebars templating, AJAX loads, bower frontend package management, for teams that are willing to learn a bit more to be more efficient)
  - Add templates for common frameworks (Bootstrap, Angular, etc.)
  - Do this by using those generators as subgenerators?? Not sure how easy this would be.
  - Do this with optional flags so users can mix-and-match?
- Update all files so that they actually use Yeoman templating instead of just being... Our files.

## Contributing

If you're interested in JavaScript, Handlebars, Markdown, Webpack, templating libraries like Handlebars, view libraries like React.js or Angular, and the future of frameworks that support the iGEM wiki and would like to contribute to the tools used to make the `igemwiki` stack run, we welcome pull requests, issue submission and emails at [virginia.igem@gmail.com](mailto:virginia.igem@gmail.com).

If you are on an iGEM team, helping us by submitting issues, or forking and pull requesting can count towards a collaboration for your team.

Links to repositories that make this tool work:

- [igem-wikibrick](https://github.com/Virginia-iGEM/igem-wikibrick), the beating heart of this generator, which supports uploading, browsersync and building.
- The original [igemwiki-api](https://github.com/igemuoftATG/igemwiki-api), written by Toronto 2016's Julian Mazzitelli
  - Our fork of [igemwiki-api](https://github.com/Virginia-iGEM/igemwiki-api), which fixes a few bugs with Julian's code and may be pulled in the future. `igem-wikibrick` runs off of this library.
