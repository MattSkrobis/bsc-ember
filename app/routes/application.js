import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service }, computed, run } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  i18n: service(),
  currentUser: service(),

  inCartCount: computed.alias('shoppingCart.inCartCount'),

  beforeModel() {
    this._loadCurrentUser();
  },

  afterModel() {
    // debugger
    // this.get('shoppingCart.getCartOrder')(this.get('session.isAuthenticated'));
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  }
});
