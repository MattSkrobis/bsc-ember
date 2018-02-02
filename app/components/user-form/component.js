import Ember from 'ember';
import { userValidations } from 'bsc-ember/validations/user';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  ajax: service(),
  paperToaster: service(),
  currentUser: service(),
  router: service(),
  store: service(),
  genders: ['male', 'female'],
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(
      this.get('user'),
      lookupValidator(userValidations),
      userValidations
    );
  },
  actions: {
    saveNew() {
      this.changeset.validate().then(() => {
        if (this.changeset.get('isValid')) {
          return this.get('ajax').request('/users', {
            method: 'POST',
            data: {
              user: {
                first_name: this.get('changeset.firstName'),
                last_name: this.get('changeset.lastName'),
                address_line1: this.get('changeset.addressLine1'),
                address_line2: this.get('changeset.addressLine2'),
                gender: this.get('changeset.gender'),
                telephone_number: this.get('changeset.telephoneNumber'),
                email: this.get('changeset.email'),
                password: this.get('changeset.password'),
                password_confirmation: this.get('changeset.passwordConfirmation'),
              }
            }
          }).then(response => {
            let userId = response.user_id;
            this.get('store').findRecord('user', userId).then(user => {
              this.set('user', user);
              this.get('router').transitionTo('login');
            });
          });
        }
      });
    },
    save() {
      this.changeset.validate().then(() => {
        if (this.changeset.get('isValid')) {
          this.changeset
            .save()
            .then(() => {
              this.set('currentUser.user', this.changeset._content);
              this.get('router').transitionTo('/');
              this.get('paperToaster').show('Success!', { duration: 3000 });
            })
            .catch(err => {
              this.get('paperToaster').show(`Error: ${err}`, { duration: 3000 });
            });
        }
      });
    },
    rollback() {
      this.changeset.rollback();
    }
  }
});
