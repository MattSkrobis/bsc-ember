import Ember from 'ember';
import { productValidations } from 'bsc-ember/validations/product';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  paperToaster: service(),
  router: service(),
  store: service(),
  init() {
    this._super(...arguments);
    this.set('categories', this.get('store').findAll('category'));
    this.changeset = new Changeset(
      this.get('model'),
      lookupValidator(productValidations),
      productValidations
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
              this.get('router').transitionTo('products.index', { queryParams: {  name: null } });
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
