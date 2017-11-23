import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.query('question', {
      include: 'answers,user-answers',
      // filter: { 'userSelectedAnswers': true }
    });
  }
});
