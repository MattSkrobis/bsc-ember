import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  currentUser: service(),
  model() {
    let userId = this.get('currentUser.user.id');
    console.log(userId)
    return this.store.query('product', { filter: { preferredProducts: userId } });
  }
});