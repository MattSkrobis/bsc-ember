import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  user: computed.alias('model.user')
});
