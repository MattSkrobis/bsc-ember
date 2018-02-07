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
  router: service(),
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

  incrementCount(orderLine) {
    let _this = this;
    orderLine.set('count', orderLine.get('count') + 1);
    orderLine.save().then(function() {
      _this.set('order', _this.getCartOrder(_this.get('currentUser.user.id')));
    });
  },

  decrementCount(orderLine) {
    if (orderLine.get('count') > 1) {
      let _this = this;
      orderLine.set('count', orderLine.get('count') - 1);
      orderLine.save().then(function() {
        _this.set('order', _this.getCartOrder(_this.get('currentUser.user.id')));
      });
    }
  },

  setOrder() {
    this.set('order', this.getCartOrder(this.get('currentUser.user.id')));
  },

  saveTransferOrder() {
    let _this = this;
    let order = this.get('order.firstObject');
    order.setProperties({
      discount: this.get('discount'),
      total: this.get('totalWithShipping'),
      courier: this.get('selectedShippingOption'),
      priceAfterDiscount: this.get('totalWithShippingAfterDiscount'),
      status: 'Niezrealizowane',
      paymentMethod: 'transfer'
    });
    order
      .save()
      .then(() => {
        _this.set('order', _this.getCartOrder(_this.get('currentUser.user.id')));
        _this.get('router').transitionTo('users.edit');
      })
      .catch(err => {
      });
  },

  addOrderLine(product, count, size) {
    let _this = this;
    this.get('store').createRecord('orderLine', {
      product,
      count,
      size,
      order: this.get('order.firstObject')
    }).save().then(function() {
      _this.set('order', _this.getCartOrder(_this.get('currentUser.user.id')));
    });
  },

  removeOrderLine(orderLine) {
    let _this = this;
    orderLine.deleteRecord().then(function() {
      _this.set('order', _this.getCartOrder(_this.get('currentUser.user.id')));
    });
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
        include: 'order-lines.product.category'
      });
    }
  }
});
