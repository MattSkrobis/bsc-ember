import Ember from 'ember';
import {
  find
} from 'lodash';

const {
  Component,
  inject: {
    service
  },
  computed,
  RSVP,
  observer
} = Ember;

export default Component.extend({
  store: service(),
  currentUser: service(),
  shoppingCart: service(),
  totalWithShipping: computed('model.firstObject.orderLines.{product}', 'selectedShippingOption', function() {
    if (this.get('model.firstObject.orderLines.firstObject.product.price')) {
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

  _saveOrder() {
    this.get('model').save().then(function(response) {
     
    });
  },

  actions: {
    removeOrderLine(orderLine) {
      this.get('shoppingCart.removeOrderLine')(orderLine);
    },
    incrementCount(orderLine) {
      let _this = this;
      orderLine.set('count', orderLine.get('count') + 1);
      // orderLine.save();
      orderLine.save().then(function() {
        _this.sendAction('reloadModel');
      });
      // this.get('model').reload();
    },
    decrementCount(orderLine) {
      this.set(orderLine.count, this.get(orderLine.count) - 1);
    }
  }
});
