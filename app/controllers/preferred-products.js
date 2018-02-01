import Ember from 'ember';

const { Controller, inject: { service }, computed, observer } = Ember;

export default Controller.extend({
  customerUserAnswers: computed('model.customer.[]', 'model.customer.userAnswers.content.[]', function() {
    debugger
    return this.get('model.customer.userAnswers');
  })
});
