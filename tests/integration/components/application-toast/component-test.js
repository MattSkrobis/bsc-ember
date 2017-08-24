import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | application toast', function() {
  setupComponentTest('application-toast', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#application-toast}}
    //     template content
    //   {{/application-toast}}
    // `);

    this.render(hbs`{{application-toast}}`);
    expect(this.$()).to.have.length(1);
  });
});
