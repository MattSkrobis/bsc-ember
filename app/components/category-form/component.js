import Ember from 'ember';
import { categoryValidations } from 'bsc-ember/validations/category';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  router: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    this.changeset = new Changeset(
      this.model,
      lookupValidator(categoryValidations),
      categoryValidations
    );
  },
  actions: {
    save() {
      this.changeset.validate().then(() => {
        if (this.changeset.get('isValid')) {
          this.changeset
            .save()
            .then(() => {
              this.get('router').transitionTo('categories.index');
            })
            .catch(err => {
              alert(err);
            });
        }
      });
    },
    rollback() {
      this.changeset.rollback();
    }
  }
});
