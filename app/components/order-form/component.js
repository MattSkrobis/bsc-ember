import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  paperToaster: service(),
  router: service(),
  currentUser: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('statuses', ['Zrealizowane', 'W realizacji', 'Nieopłacone', 'Anulowane']);
    this.set('size', ['XS, S, M, L, XL']);
  },
  actions: {
    save() {
      this.get('model').save().then(() => {
        this.get('paperToaster').show('Success!', { duration: 3000 });
        this.get('router').transitionTo('admin.orders');
      }).catch(err => {
        this.get('paperToaster').show(`Error: ${err}`, { duration: 3000 });
      });
    },
    toggle() {
      this.toggleProperty('showProducts');
    }
  }
});
