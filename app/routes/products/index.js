import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  queryParams: {
    // availability: {
    //   refreshModel: true,
    //   replace: true
    // },
    name: {
      refreshModel: true,
      replace: true
    }
  },
  model(params) {
    return this.store.query('product', { filter: params });
  }
});
