import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | picture list', function() {
  setupComponentTest('picture-list', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#picture-list}}
    //     template content
    //   {{/picture-list}}
    // `);

    this.render(hbs`{{picture-list}}`);
    expect(this.$()).to.have.length(1);
  });
});
