import Ember from 'ember';

const {
  Component,
  inject: {
    service
  }
} = Ember;

export default Component.extend({
  ajax: service(),
  error: '',
  actions: {
    sendRequest() {
      let password = this.get('password');
      let passwordConfirmation = this.get('passwordConfirmation');
      let token = this.get('token');
      if (this._passwordsValid(password, passwordConfirmation)) {
        return this.get('ajax').request('/users/password', {
          method: 'PUT',
          data: {
            user: {
              password,
              reset_password_token: token,
              password_confirmation: passwordConfirmation,
            }
          }
        }).then(() => {
          this.get('router').transitionTo('/');
        });
      }
    }
  },
  _passwordsValid(password, passwordConfirmation) {
    if (this._passwordValid(password) &&
      this._passwordConfirmationValid(passwordConfirmation) &&
      password === passwordConfirmation) {
      return true;
    } else {
      this.set('error', true);
    }
  },
  _passwordValid(password) {
    if (password && password.length >= 6) {
      return true;
    }
  },
  _passwordConfirmationValid(passwordConfirmation) {
    if (passwordConfirmation && passwordConfirmation.length >= 6) {
      return true;
    }
  }
});
