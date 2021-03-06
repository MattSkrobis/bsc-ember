import Ember from 'ember';
import {
  find
} from 'lodash';

const {
  Component,
  inject: {
    service
  },
  computed
} = Ember;

export default Component.extend({
  store: service(),
  router: service(),
  currentUser: service(),
  shoppingCart: service(),
  model: computed.alias('shoppingCart.order'),
  sortingParams: ['id:desc'],
  sortedLines: computed.sort('model.firstObject.orderLines', 'sortingParams'),
  totalWithShipping: computed('model.[]', 'selectedShippingOption', function() {
    if (this.get('model.firstObject.orderLines')) {
      let prices = this.get('model.firstObject.orderLines').map(function(ol) {
        return ol.get('product.price') * ol.get('count');
      });
      let sum = prices.reduce((previous, current) => {
        previous = previous + current;
        return previous;
      }, 0);
      return sum + this.get('shippingOptionCost');
    }
    return 0;
  }),

  shippingOptionCost: computed('selectedShippingOption', function() {
    let selectedShippingOption = this.get('selectedShippingOption');
    if (selectedShippingOption) {
      return this.get('shippingOptions').filter(function(option) {
        return (option.name === selectedShippingOption);
      })[0].value;
    }
    return 0;
  }),

  totalWithShippingAfterDiscount: computed('totalWithShipping', function() {
    let total = this.get('totalWithShipping');
    if (total < 500) {
      return Math.round((total * this.get('discounts.small')) * 100) / 100;
    } else if (total < 1000) {
      return Math.round((total * this.get('discounts.medium')) * 100) / 100;
    } else {
      return Math.round((total * this.get('discounts.large')) * 100) / 100;
    }
  }),

  discount: computed('totalWithShipping', function() {
    let total = this.get('totalWithShipping');
    if (total < 500) {
      return this.get('discounts.small');
    } else if (total < 1000) {
      return this.get('discounts.medium');
    } else {
      return this.get('discounts.large');
    }
  }),

  orderCorrect: computed('model.firstObject.orderLines', 'selectedShippingOption', function() {
    if (this.get('model.firstObject.orderLines.length') > 0 && this.get('selectedShippingOption')) {
      return false;
    } else {
      return true;
    }
  }),

  init() {
    this._super(...arguments);
    this.set('shippingOptions', [{
      name: 'DSD',
      value: 12
    }, {
      name: 'QRS',
      value: 11
    }, {
      name: 'Poczta Polska',
      value: 9
    }]);
    this.set('discounts', {
      small: 0.98,
      large: 0.95,
      medium: 0.95
    });
  },

  actions: {
    removeOrderLine(orderLine) {
      orderLine.destroyRecord();
    },

    incrementCount(orderLine) {
      this.get('shoppingCart').incrementCount(orderLine);
    },

    decrementCount(orderLine) {
      this.get('shoppingCart').decrementCount(orderLine);
    },

    saveTransferOrder() {
      this.get('shoppingCart').saveTransferOrder();
      let _this = this;
      let order = this.get('model.firstObject');
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
          this.get('router').transitionTo('users.edit');
        });
    }
  }
});
