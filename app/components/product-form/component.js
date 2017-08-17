import Ember from 'ember';

const { Component,
  inject: {
    service
  } } = Ember;

export default Component.extend({
  router: service(),
  actions: {
    save() {
      this.changeset.validate().then(()=>{
        if (this.changeset.get('isValid')) {
          this.changeset.save().then(()=>{
            this.get('router').transitionTo('products.index');
          });
        }
      });
    },
    rollback() {
      this.changeset.rollback();
    }
  }
});
