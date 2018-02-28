import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  currentUser: service(),
  'data-test-product-thumb': true,
  attributeBindings: ['data-test-product-thumb'] // set binding on the components main div
});
