import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model(params) {
    return RSVP.hash({
      userAnswers: this.store.query('userAnswer', {
        filter: { userId: params.user_id },
        include: 'answer,question'
      }),
      questions: this.store.findAll('question', {
        include: 'answers'
      })
    });
  },
  actions: {
    reloadModel() {
      this.refresh();
    }
  }
});
