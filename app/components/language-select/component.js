import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  'data-test-language-select': true,
  attributeBindings: ['data-test-language-select'],
  classNames: ['language-select'],
  i18n: service(),
  languages: ['en', 'pl'],
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('language', this.get('i18n.locale'));
  },
  actions: {
    selectLanguage(language) {
      this.set('i18n.locale', language);
      this.set('language', language);
    }
  }
});
