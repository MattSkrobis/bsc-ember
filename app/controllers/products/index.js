import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['availability', 'name'],
  availability: true,
  name: null,
  actions: {
    updateName(query) {
      this.set('searchQuery', query);
      this.get('nameUpdate').perform(query);
    }
  },
  nameUpdate: task(function* (name) {
    this.set('searchQuery', name);
    yield timeout(2000);
    return this.set('name', name);
  }).restartable()
});
