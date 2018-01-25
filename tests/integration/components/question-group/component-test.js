import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | question group', function() {
  setupComponentTest('question-group', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#question-group}}
    //     template content
    //   {{/question-group}}
    // `);

    this.render(hbs`{{question-group}}`);
    expect(this.$()).to.have.length(1);
  });
});
