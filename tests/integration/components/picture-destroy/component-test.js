import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | picture destroy', function() {
  setupComponentTest('picture-destroy', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#picture-destroy}}
    //     template content
    //   {{/picture-destroy}}
    // `);

    this.render(hbs`{{picture-destroy}}`);
    expect(this.$()).to.have.length(1);
  });
});
