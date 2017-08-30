import Ember from 'ember';
import { pictureValidations } from 'bsc-ember/validations/picture';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  paperToaster: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    this.createChangeset();
  },
  createChangeset() {
    this.changeset = new Changeset(
      this.newPicture,
      lookupValidator(pictureValidations),
      pictureValidations
    );
  },
  actions: {
    closeDialog() {
      this.set('showDialog', false);
    },
    create(product) {
      this.changeset.validate().then(() => {
        if (this.changeset.get('isValid')) {
          this.changeset.set('product', product);
          this.changeset
            .save()
            .then(() => {
              this.get('paperToaster').show('Success!', { duration: 3000 });
              this.set('changeset.url', '');
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
      this.changeset.rollback();
    }
  }
});
