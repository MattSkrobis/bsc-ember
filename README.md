# bsc-ember

[![Build Status](https://travis-ci.org/MattSkrobis/bsc-ember.svg?branch=master)](https://travis-ci.org/MattSkrobis/bsc-ember)
[![Dependency Status](https://gemnasium.com/badges/github.com/MattSkrobis/bsc-ember.svg)](https://gemnasium.com/github.com/MattSkrobis/bsc-ember)
[![codecov](https://codecov.io/gh/MattSkrobis/bsc-ember/branch/master/graph/badge.svg)](https://codecov.io/gh/MattSkrobis/bsc-ember)
  
This application will be an e-commerce online shop

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone git@github.com:MattSkrobis/bsc-ember.git` this repository
* `cd bsc-ember`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* App can be run in two modes: 
  - `ember s -e rails` - will communicate with backend
  - `ember s` - will use Mirage's default scenario

### Running Tests

* `ember test` - tests can be filtered by adding `-f` flag and passing a name of test
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* App is deployed on Heroku, automatic deployments are enabled, to deploy manually use
  - heroku dashboard
  or
  - `git push heroku master`
