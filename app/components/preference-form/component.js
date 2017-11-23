import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  currentUser: service(),
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
        })
        .catch(err => {
          this.get('paperToaster').show(`Error: ${err}`, { duration: 3000 });
        });
    },
    rollback() {
      this.changeset.rollback();
    }
  }
});
