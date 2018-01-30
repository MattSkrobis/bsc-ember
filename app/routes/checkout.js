import Ember from 'ember';

const {
  Route,
  inject: {
    service
  },
  RSVP
} = Ember;

export default Route.extend({
  currentUser: service(),
  model() {
    let userId = this.get('currentUser.user.id');
    return this.store.query('order', {
      reload: true,
      filter: {
        cart: {
          userId,
          status: 'Koszyk'
        }
      },
      include: 'order-lines.product'
    });
  },
  actions: {
    reloadModel() {
      this.refresh();
    }
  }
});
