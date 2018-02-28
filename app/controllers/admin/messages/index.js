import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['email'],
  email: null,
  actions: {
  },
  emailUpdate: task(function* (email) {
    this.set('searchQuery', email);
    yield timeout(500);
    return this.set('email', email);
  }).restartable()
});
