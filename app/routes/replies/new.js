import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('reply');
    // .then(response => {
    //   debugger
    //   let message = this.store.findRecord('message', params.message_id);
    //   response.set('message', message);
    // });
    // .then((response) => {
    //   debugger
    //   this.store.createRecord('reply', { messageId: params.message_id })
    // });
  }
});
