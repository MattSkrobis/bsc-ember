import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let userId = params.user_id;
    return this.store.query('order', {
      reload: true,
      filter: {
        notCart: {
          userId
        }
      },
      include: 'order-lines.product'
    });
  }
});
