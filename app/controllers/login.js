import Ember from 'ember';
const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  session: service('session'),
  currentUser: service('current-user'),
  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:devise', identification, password).catch(reason => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});