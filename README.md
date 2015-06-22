# nodejs-microservice-poc
[![GitHub version][git-tag-image]][project-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-url]][daviddm-image]
[![DevDependency Status][daviddm-dev-url]][daviddm-dev-image]
[![Inline docs][doc-image]][doc-url]
[![Code Climate][climate-image]][climate-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Microservice PoC running at Nodejs inside Docker

- [GitHub Repository and code][project-url]
- [GitHub Pages](http://ismarslomic.github.io/nodejs-microservice-poc)

## Dev op tools
- Source code coverage with [coveralls](https://coveralls.io). Note this is in addition to Codeclimate code coverage
- Continous Integration (build and test Github projects) with open-source tool [travis-ci](https://travis-ci.org)
- Version control and issue tracking with [github](https://github.com)
- Project dependency checker with [david-dm](https://david-dm.org/)
- Automated code review with and show source code coverage [codeclimate](https://codeclimate.com/). Note that this is in addition to Coveralls coverage
- Javascript documentation notation with [jsdoc](http://usejsdoc.org/)
- Evaluation of inline code documentation from [Inch CI](http://inch-ci.org/)

## Scaffolding based on yeoman generator
- [generator-nody](https://github.com/qiu8310/generator-nody)
- [generator-restify-mongo](https://github.com/lawls544/generator-restify-mongo)

## Install and setup


### Node.js

```bash
npm install
```

### Connect to remote Github repository (one-time only)
```bash
cd nodejs-microservice-poc
git init
git add .
git commit -m “Initial commit with use of scaffolding”
git remote add origin git@github.com:ismarslomic/nodejs-microservice-poc.git
git push --set-upstream origin master
```

### Setup Travis (one time only)
1. Go to [Travis account](https://travis-ci.org/profile/ismarslomic)
2. Press the Sync button
3. Switch to ON for the repository
4. If Travis has not been configured to make push towards GitHub, then follow 
[these](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd) instructions
4. Make new `git push`to trigger build

### Setup Codeclimate (one time only)
1. [Add Github Repository](https://codeclimate.com/github/signup) at codeclimate.com
2. Fill out the repository name and press `Import repo from Github
3. Follow the [JavaScript instructions](https://codeclimate.com/repos/5579dda1e30ba041b7001840/coverage_setup) to 
connect code quality with test coverage. Remember to add the 
[environment variable to Travis](https://travis-ci.org/ismarslomic/nodejs-microservice-poc/settings/env_vars) and to your 
local env as well. You can find the repo token in the URL barl of your browser.

### Setup Inch-CI (one time only)
1. Go to the [Inch-CI project](http://inch-ci.org/github/ismarslomic/nodejs-microservice-poc) and press Create button

### Setup David-dm (one time only)
No setup is required, david-dm will automatically recognise and run check

### Setup Coveralls (one time only)
1. [Add new repo](https://coveralls.io/repos/new) by swithing Github repo to ON
2. Follow the ***SET UP COVERALLS*** steps for adding `.coveralls.yml` in repository root
2. Run the NPM script `npm run coveralls`
3. Travis will automatically run this command after each build. See [.travis.yml](.travis.yml)

## Gulp tasks
- ```gulp test``` to run ```lint``` and ```istanbul```
- ```gulp release``` to bump version number in ```package.json```
- ```gulp``` to ```test``` and ```watch```

## NPM scripts
- ```npm run docs``` generates HTML documentation in /docs based with help of ```jsdoc``` annotations
- ```npm run coveralls```
- ```npm run test``` runs mocha test by triggering ```gulp test```

## Shell scripts
- ```/publish_docs.sh``` publish documentation placed at ```/docs``` to [github pages](http://ismarslomic.github.io/nodejs-microservice-poc/) by commiting to branch ```gh-pages```

# Dependencies

## devDependencies
- Mocha Unit Testing with [gulp-mocha](https://github.com/sindresorhus/gulp-mocha)
- Automagically lint your code with [gulp-jshint](https://github.com/spenceralger/gulp-jshint)
- Check JavaScript code style with [gulp-jscs](https://github.com/sindresorhus/gulp-jscs)
- Measuring code coverage with [gulp-istanbul](https://github.com/SBoudrias/gulp-istanbul)
- Upload LCOV data to [coveralls.io](http://coveralls.io) with [coveralls](https://github.com/cainus/node-coveralls)
- Bump npm versions with [gulp-bump](https://github.com/stevelacy/gulp-bump)

## dependencies
- Debug your code with [debug](https://github.com/visionmedia/debug)
- Neat utilities with [lodash](http://lodash.com/)
- Creating and composing asynchronous promises with [q](https://github.com/kriskowal/q)

## Update dependencies
Upgrade npm modules to latest version by use of [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)

```bash
# Install the npm package globally
npm install -g npm-check-updates

# Get list of all upgrades
ncu

# Upgrade all npm modules to latest version and update package.json file
sudo ncu -u
```

## API

_(Coming soon)_


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).


## Reference
* [nodes-restful-api](https://github.com/tutsplus/nodes-restful-api) - RESTful API with MongoDB, Restify, NodeJS
* [CI Test for Browser](https://ci.testling.com/) - Run your browser tests on every push, demo project [js-traverse](https://github.com/substack/js-traverse)
* [GA on Github](https://github.com/igrigorik/ga-beacon) - Google Analytics collector-as-a-service (using GA measurement protocol).
* [idiomatic.js](https://github.com/rwaldron/idiomatic.js) - Principles of Writing Consistent, Idiomatic JavaScript
* [Use jsdoc](http://usejsdoc.org/index.html)
* [Using the ES6 transpiler Babel on Node.js](http://www.2ality.com/2015/03/babel-on-node.html)
* [Node Collection](https://github.com/npm/newww/issues/313)
  - [http://tools.ampersandjs.com/](http://tools.ampersandjs.com/)
  - [https://github.com/sindresorhus/awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs)
  - [https://www.npmjs.com/package/frontend-npm-goodies](https://www.npmjs.com/package/frontend-npm-goodies)
  - [https://github.com/Raynos/http-framework/wiki/Modules#response](https://github.com/Raynos/http-framework/wiki/Modules#response)
  - [https://github.com/npm-dom](https://github.com/npm-dom)
  - [https://www.npmjs.com/package/mad-science-modules](https://www.npmjs.com/package/mad-science-modules)
  - [https://www.npmjs.com/package/npm-collection-language-tools#readme](https://www.npmjs.com/package/npm-collection-language-tools#readme)
  - And more...


## License

Copyright (c) 2015 Ismar Slomic. Licensed under the MIT license.

[doc-url]: http://inch-ci.org/github/ismarslomic/nodejs-microservice-poc
[doc-image]: http://inch-ci.org/github/ismarslomic/nodejs-microservice-poc.svg?branch=master
[project-url]: https://github.com/ismarslomic/nodejs-microservice-poc
[git-tag-image]: http://img.shields.io/github/tag/ismarslomic/nodejs-microservice-poc.svg
[climate-url]: https://codeclimate.com/github/ismarslomic/nodejs-microservice-poc
[climate-image]: https://codeclimate.com/github/ismarslomic/nodejs-microservice-poc/badges/gpa.svg
[travis-url]: https://travis-ci.org/ismarslomic/nodejs-microservice-poc
[travis-image]: https://travis-ci.org/ismarslomic/nodejs-microservice-poc.svg?branch=master
[daviddm-url]: https://david-dm.org/ismarslomic/nodejs-microservice-poc.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/ismarslomic/nodejs-microservice-poc
[daviddm-dev-url]: https://david-dm.org/ismarslomic/nodejs-microservice-poc/dev-status.svg
[daviddm-dev-image]: https://david-dm.org/ismarslomic/nodejs-microservice-poc#info=devDependencies
[coveralls-url]: https://coveralls.io/r/ismarslomic/nodejs-microservice-poc?branch=master
[coveralls-image]: https://coveralls.io/repos/ismarslomic/nodejs-microservice-poc/badge.svg?branch=master
