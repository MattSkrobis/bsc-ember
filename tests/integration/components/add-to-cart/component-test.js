import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | add to cart', function() {
  setupComponentTest('add-to-cart', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#add-to-cart}}
    //     template content
    //   {{/add-to-cart}}
    // `);

    this.render(hbs`{{add-to-cart}}`);
    expect(this.$()).to.have.length(1);
  });
});
