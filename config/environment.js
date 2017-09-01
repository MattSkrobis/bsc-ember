/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'bsc-ember',
    environment,
    rootURL: '/',
    locationType: 'auto',
    'emberRollbarClient': {
      accessToken: '0e7b977b67e94392a6bc8371236af93d'
    },
    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {
      host: 'http://localhost:3000'
    }
  };

  ENV.i18n = {
    defaultLocale: 'pl'
  };

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'rails') {
    ENV['ember-simple-auth'] = {
      baseURL: 'http://localhost:3000'
    };
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV['ember-simple-auth'] = {
      baseURL: 'https://bsc-ember-backend.herokuapp.com'
    };
    ENV.APP.host =  'https://bsc-ember-backend.herokuapp.com';
  }

  return ENV;
};
