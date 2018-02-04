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

  inCartCount() {
    let orderLinesLength = this.get('order.firstObject.orderLines.content.length');
    if (orderLinesLength) {
      let orderLines = this.get('order.firstObject.orderLines.content');
      return orderLines.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue.get('count');
      }, 0);
    }
  },

  init() {
    let _this = this;
    _this.get('currentUser').load().then(()=>{
      Ember.run.later(function() {
        _this.set('order', _this.getCartOrder(_this.get('currentUser.user.id')));
      }, 500);
    });
  },

  saveOrder() {
    this.get('order').save();
  },

  addOrderLine(product, count, size) {
    return this.get('store').createRecord('orderLine', {
      product,
      count,
      size,
      order: this.get('order.firstObject ')
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
