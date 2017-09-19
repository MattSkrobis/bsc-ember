import Ember from 'ember';
import { userValidations } from 'bsc-ember/validations/user';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  paperToaster: service(),
  currentUser: service(),
  router: service(),
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
