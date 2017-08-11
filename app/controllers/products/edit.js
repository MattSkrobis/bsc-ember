import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    save(changeset) {
      changeset.save().then(()=>{
        this.transitionToRoute('products.index');
      });
    },
    rollback(changeset) {
      changeset.rollback();
    }
  }
});