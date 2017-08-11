import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    save() {
      this.attrs.save(this.get('changeset'));
    },
    rollback() {
      this.attrs.rollback(this.get('changeset'));
    }
  }
});
