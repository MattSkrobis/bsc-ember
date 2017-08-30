import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return {
      newPicture: this.store.createRecord('picture'),
      product: this.store.find('product', params.product_id)
    };
  }
});
