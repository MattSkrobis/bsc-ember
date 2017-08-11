import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    toggle() {
      this.toggleProperty('confirmShown');
    },

    submitConfirm() {
      this.get('onConfirm')();
    }
  }
});
