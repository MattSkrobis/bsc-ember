import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | product new', function() {
  setupComponentTest('product-new', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#product-new}}
    //     template content
    //   {{/product-new}}
    // `);

    this.render(hbs`{{product-new}}`);
    expect(this.$()).to.have.length(1);
  });
});
