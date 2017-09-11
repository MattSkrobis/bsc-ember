module.exports = {
  name: 'redirector',
  redirectCode(config) {
    return [
      '<script>',
      '(function(){',
      "var config = require('bsc-ember/config/environment')['default'];",
      'window.ENV = config;',
      "if(window.ENV.SSL && window.location.protocol === 'http:') {",
      "window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);",
      'return;',
      '}',
      "window.BscEmber = require('bsc-ember/app')['default'].create({{APP_CONFIG}});",
      '}());',
      '</script>'
    ];
  },
  contentFor(type, config) {
    let content = '';

    if (type === 'head') {
      content =  this.redirectCode(config).join('\n');
    }

    return content;
  },
  isDevelopingAddon() {
    return true;
  }
};