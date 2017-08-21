import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  queryParams: {
    availability: {
      refreshModel: true
    },
    name: {
      refreshModel: true
    }
  },
  model(params) {
    return this.store.query('product', { filter: params });
  }
});
