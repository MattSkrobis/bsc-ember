import Ember from 'ember';

const {
  Service,
  inject: {
    service
  },
  RSVP
} = Ember;

export default Service.extend({
  currentUser: service(),
  shoppingCart: service(),
  store: service(),

  // init() {
  //   this._super(...arguments);
  //   this.set('shippingOptions', [{
  //     name: 'DSD',
  //     value: 12
  //   }, {
  //     name: 'QRS',
  //     value: 11
  //   }, {
  //     name: 'Poczta Polska',
  //     value: 9
  //   }]);
  //   this.draftOrder();
  // },

  saveOrder() {
    this.get('order').save();
  },

  draftOrder() {
    let userId = this.get('currentUser.user.id');
    return this.get('store').query('order', {
      filter: {
        cart: {
          userId,
          status: 'Koszyk'
        }
      }
    }).then(order => {
      this.set('order', order);
      RSVP.all(order.getEach('orderLine'));
    });
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
