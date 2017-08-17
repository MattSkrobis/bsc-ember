import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return this.store.find('category', params.category_id);
  }
});
