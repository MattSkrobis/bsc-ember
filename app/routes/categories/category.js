import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  currentUser: service(),
  model(params) {
    return this.store.find('category', params.category_id);
  }
});
