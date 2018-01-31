import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | payment page', function() {
  setupComponentTest('payment-page', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#payment-page}}
    //     template content
    //   {{/payment-page}}
    // `);

    this.render(hbs`{{payment-page}}`);
    expect(this.$()).to.have.length(1);
  });
});
