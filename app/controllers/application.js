import Ember from 'ember';

const { Controller, inject: { service }, computed } = Ember;

export default Controller.extend({
  session: service(),
  currentUser: service(),
  shoppingCart: service(),
  totalItemCount: computed.alias('shoppingCart.itemsInShoppingCart'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate(this.get('session.data.authenticated.token'));
    }
  }
});
