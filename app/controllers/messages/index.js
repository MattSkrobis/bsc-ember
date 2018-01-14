import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['email'],
  email: null,
  actions: {
    updateEmail(query) {
      this.set('searchQuery', query);
      this.get('emailUpdate').perform(query);
    }
  },
  emailUpdate: task(function* (email) {
    this.set('searchQuery', email);
    yield timeout(2000);
    return this.set('email', email);
  }).restartable()
});
