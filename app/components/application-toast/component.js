import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  toast: service('application-toast'),
  message: computed.alias('toast.message')
});
