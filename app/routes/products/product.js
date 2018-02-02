import Ember from 'ember';

const { Route, service } = Ember;

export default Route.extend({
  model(params) {
    return this.store.find('product', params.product_id);
  }
});
