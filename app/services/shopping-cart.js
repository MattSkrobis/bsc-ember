import Ember from 'ember';

const {
  Service,
  inject: {
    service
  },
  RSVP,
  computed,
  run
} = Ember;

export default Service.extend({
  currentUser: service(),
  shoppingCart: service(),
  store: service(),
  session: service(),

  inCartCount: computed('model.[]', function() {
    debugger
  }),

  saveOrder() {
    this.get('order').save();
  },

  getCartOrder(isAuthenticated) {
    // run.later(function() {
    if (isAuthenticated) {
      let userId = this.get('currentUser.user.id');
      return this.get('store').query('order', {
        reload: true,
        filter: {
          cart: {
            userId,
            status: 'Koszyk'
          }
        },
        include: 'order-lines.product'
      }).then(order => {
        this.set('order', order);
      });
    }
    // }, 2000);
  },

  actions: {
    addOrderLine(product, count) {
      this.get('store').createRecord('orderLine', {
        product,
        count,
        order: this.get('order')
      });
    },

    removeOrderLine(orderLine) {
      orderLine.deleteRecord();
    }
  }
});
