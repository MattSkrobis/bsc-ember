import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  ajax: service(),
  actions: {
    sendRequest() {
      return this.get('ajax').request('/users/password', {
        method: 'POST',
        data: {
          email: this.get('email')
        }
      }).then(() => {
        this.get('router').transitionTo('/');
      });
    }
  }
});
