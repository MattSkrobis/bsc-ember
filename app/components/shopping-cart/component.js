import Ember from 'ember';
import { find } from 'lodash';

const { Component, inject: { service }, computed, RSVP, observer } = Ember;

export default Component.extend({
  store: service(),
  currentUser: service(),
  shoppingCart: service(),
  totalWithShipping: computed('model.orderLines.[]', function() {
    if (this.get('model')) {
      let prices = this.get('model.orderLines').map(ol => ol.product.price * ol.count);
      return prices.reduce((previous, current)=> {
        previous = previous + current;
        return previous;
      }, 0) + (this.get('selectedShippingOption') || 0);
    }
    return 0;
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
    console.log(this.get('model.orderLines'));
    // this._draftOrder();
  },

  // _draftOrder() {
  //   let userId = this.get('currentUser.user.id');
  //   return this.get('store').query('order', { filter: {
  //     cart: {
  //       userId,
  //       status: 'Koszyk'
  //     }
  //   }
  //   }).then(order => {
  //     this.set('order', order);
  //     order.get('orderLines');
  //   });
  // },

  _saveOrder() {
    this.get('order').save();
  },

  actions: {
    removeOrderLine(orderLine) {
      this.get('shoppingCart.removeOrderLine')(orderLine);
    },
    incrementCount(orderLine) {
      this.set(orderLine.count,  this.get(orderLine.count) + 1);
    },
    decrementCount(orderLine) {
      this.set(orderLine.count,  this.get(orderLine.count) - 1);
    }
  }
});
