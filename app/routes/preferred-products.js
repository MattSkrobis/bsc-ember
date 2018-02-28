import Ember from 'ember';

const { Route, inject: { service }, RSVP } = Ember;

export default Route.extend({
  currentUser: service(),
  model(params) {
    return RSVP.hash({
      customer: this.store.query('user', {
        filter: { id: params.user_id },
        include: 'user-answers.question,user-answers.answer,'
      }),
      products: this.store.query('product', {
        filter: { preferredProducts: params.user_id },
        include: 'category'
      })
    });
  }
});