import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    launchConfirmDialog() {
      this.set('confirmShown', true);
    },

    submitConfirm() {
      this.get('onConfirm')();
    },

    cancelConfirm() {
      this.set('confirmShown', false);
    }
  }
});
