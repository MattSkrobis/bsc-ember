import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | order form', function() {
  setupComponentTest('order-form', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#order-form}}
    //     template content
    //   {{/order-form}}
    // `);

    this.render(hbs`{{order-form}}`);
    expect(this.$()).to.have.length(1);
  });
});
