import Ember from 'ember';
import { pictureValidations } from 'bsc-ember/validations/picture';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  paperToaster: service(),
  store: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    this.pictureChangeset = this.createChangeset();
  },
  createChangeset() {
    return new Changeset(
      this.get('store').createRecord('picture'),
      lookupValidator(pictureValidations),
      pictureValidations
    );
  },
  actions: {
    closeDialog() {
      this.set('showDialog', false);
    },
    create(product) {
      this.pictureChangeset.validate().then(() => {
        if (this.pictureChangeset.get('isValid')) {
          this.pictureChangeset.set('product', product._content);
          this.pictureChangeset
            .save()
            .then(() => {
              this.get('paperToaster').show('Success!', { duration: 3000 });
              this.set('pictureChangeset', this.createChangeset());
              this.set('showDialog', false);
            })
            .catch(err => {
              this.get('paperToaster').show(`Error: ${err}`, { duration: 3000 });
            });
        }
      });
    },
    rollback() {
      this.set('showDialog', false);
      this.pictureChangeset.rollback();
    }
  }
});
