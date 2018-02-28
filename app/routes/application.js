import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  i18n: service(),
  currentUser: service(),

  beforeModel() {
    this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  }
});
