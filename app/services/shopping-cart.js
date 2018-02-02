import Ember from 'ember';

const {
  Service,
  inject: {
    service
  },
  computed,
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  inCartCount: computed('model.[]', function() {
  }),

  init() {
    this.set('order', this.getCartOrder(this.get('currentUser.user.id')));
  },

  saveOrder() {
    this.get('order').save();
  },

  addOrderLine(product, count, size) {
    return this.get('store').createRecord('orderLine', {
      product,
      count,
      size,
      order: this.get('order')
    }).save();
  },

  removeOrderLine(orderLine) {
    orderLine.deleteRecord();
  },

  getCartOrder(userId) {
    if (userId) {
      return this.get('store').query('order', {
        reload: true,
        filter: {
          cart: {
            userId,
            status: 'Koszyk'
          }
        },
        include: 'order-lines.product'
      });
    }
  }
});
