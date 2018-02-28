import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | shopping cart', function() {
  setupComponentTest('shopping-cart', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#shopping-cart}}
    //     template content
    //   {{/shopping-cart}}
    // `);

    this.render(hbs`{{shopping-cart}}`);
    expect(this.$()).to.have.length(1);
  });
});
