import Ember from 'ember';

const { Route, inject: { service }, computed, RSVP } = Ember;

export default Route.extend({
  currentUser: service(),
  kot: computed('model.products.[]', function() {
    debugger
    return this.get('currentUser.user');
  }),
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
  },
  // afterModel(params) {
  //   console.log(this.get('currentUser.user'));
  //   debugger
  //   this.set('user', this.get('currentUser.user'));
  //   return this.store.query('user', {
  //     filter: { id: params.user_id },
  //     include: 'user-answers.question,user-answers.answer,'
  //   });
  // }
});