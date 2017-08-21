import Ember from 'ember';

const { Controller, run } = Ember;

export default Controller.extend({
  queryParams: ['availability', 'name'],
  availability: true,
  name: null,
  actions: {
    debouncedNameSearch() {
      
    }
  }
});
