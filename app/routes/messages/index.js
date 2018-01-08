import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  queryParams: {
    name: {
      refreshModel: true,
      replace: true
    }
  },
  model(params) {
    return this.store.query('message', { filter: params });
  }
});
