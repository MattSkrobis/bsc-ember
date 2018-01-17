import Ember from 'ember';
import { replyValidations } from 'bsc-ember/validations/reply';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  paperToaster: service(),
  router: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    let message = this.get('store').findRecord('message', this.get('router.location.history.state.path').split('/')[3]);
    this.set('message', message);
    this.changeset = new Changeset(
      this.reply,
      lookupValidator(replyValidations),
      replyValidations
    );
  },
  actions: {
    save() {
      this.changeset.validate().then(() => {
        if (this.changeset.get('isValid')) {
          this.changeset.set('message', this.get('message'));
          this.changeset
            .save()
            .then(() => {
              this.get('paperToaster').show('Success!', { duration: 3000 });
              this.get('router').transitionTo('messages.index', { queryParams: { name: '' } });
            })
            .catch(err => {
              this.get('paperToaster').show(`Error: ${err}`, { duration: 3000 });
            });
        }
      });
    },
    rollback() {
      this.changeset.rollback();
    }
  }
});
