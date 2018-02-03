import Ember from 'ember';
import { categoryValidations } from 'bsc-ember/validations/category';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  // paperToaster: service(),
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
              this.get('paperToaster').show('Success!', { duration: 3000 });
              this.get('router').transitionTo('categories.index');
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
