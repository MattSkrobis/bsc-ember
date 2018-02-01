import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  store: service(),
  currentUser: service(),
  router: service(),
  selectedAnswer: computed('question', 'userAnswers.content.[]', function() {
    let questionId = this.get('question.id');
    return this.get('userAnswers').map(function(userAnswer) {
      if (userAnswer.get('question.id') == questionId) {
        return userAnswer.get('answer.id');
      }
    }).filter(Boolean)[0];
  }),

  actions: {
    save(question, answer) {
      this.get('store')
        .query('userAnswer', {
          filter: {
            questionId: question.get('id'),
            userId: this.get('currentUser.user.id')
          }
        })
        .then(resource => {
          let id = resource.get('firstObject.id');
          let record = this.get('store').peekRecord('userAnswer', id);
          record.set('answer', answer);
          record.save();
          location.reload(true);
        });
    }
  }
});
