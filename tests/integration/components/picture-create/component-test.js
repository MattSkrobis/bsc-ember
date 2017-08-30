import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | picture create', function() {
  setupComponentTest('picture-create', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#picture-create}}
    //     template content
    //   {{/picture-create}}
    // `);

    this.render(hbs`{{picture-create}}`);
    expect(this.$()).to.have.length(1);
  });
});
