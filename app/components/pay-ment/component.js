import Ember from 'ember';
import CryptoJS from 'cryptojs';

const {
  Component,
  inject: {
    service
  },
  computed
} = Ember;

export default Component.extend({
  shoppingCart: service(),
  currentUser: service(),
  customerEmail: computed.alias('customer.email'),
  totalAmount: computed('order.priceAfterDiscount', function() {
    if (this.get('order.priceAfterDiscount')) {
      return (this.get('order.priceAfterDiscount').toFixed(2));
    }
  }),
  totalAmountCents: computed('totalAmount', function() {
    if (this.get('order.priceAfterDiscount')) {
      return (this.get('order.priceAfterDiscount') * 100);
    }
  }),
  currency: 'PLN',
  country: 'pl',
  pos: '300746',
  shop: 'BSC',
  order: computed.alias('shoppingCart.order.firstObject'),
  customer: computed.alias('currentUser.user'),
  computedSHA256: computed('customer', 'order', function() {
    if (this.get('customerEmail') && this.get('totalAmount')) {
      // debugger
      console.log(this.get('currency') 
      + this.get('customerEmail') 
      + this.get('country') 
      + this.get('pos')
      + this.get('shop')
      + this.get('totalAmount')
      + 'b6ca15b0d1020e8094d9b5f8d163db54');
      return CryptoJS.SHA256(this.get('currency') 
      + this.get('customerEmail') 
      + this.get('country') 
      + this.get('pos')
      + this.get('shop')
      + this.get('totalAmount')
      + 'b6ca15b0d1020e8094d9b5f8d163db54').toString();
    }
 
    // return CryptoJS.SHA256( 'PLN'
    // + 'test@test.com' 
    // + 'pl'
    // + '145227'
    // + 'TEST'
    // + '12345'+ '13a980d4f851f3d9a1cfc792fb1f5e50');
  // }
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this.get('currentUser').load();
  }
});

// {{!-- currency-code: PLN
//   customer-email: test@test.com
//   customer-language: pl
//   merchant-pos-id: 145227
//   shop-name: TEST
//   total-amount: 12345 --}}