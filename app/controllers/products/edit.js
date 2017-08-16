import Ember from 'ember';
import { productValidations } from '../../validations/product';

const { Controller } = Ember;

export default Controller.extend({
  productValidations,
  actions: {
    save(changeset) {
      changeset.validate().then(()=>{
        if (changeset.get('isValid')) {
          changeset.save().then(()=>{
            this.transitionToRoute('products.index');
          });
        }
      });
    },
    rollback(changeset) {
      changeset.rollback();
    }
  }
});