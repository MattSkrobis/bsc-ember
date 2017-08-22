import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['availability', 'name'],
  availability: true,
  name: null,
  nameUpdate: task(function* (name) {
    this.set('name', name);
    yield timeout(250);
  }).restartable()
});
