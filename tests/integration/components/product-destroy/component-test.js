import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers'; // different find
import sinon from 'sinon';

describe('Integration | Component | product destroy', function() {
  setupComponentTest('product-destroy', {
    integration: true
  });

  beforeEach(function() {
    this.set('product', { name: 'Phone', description: 'Black', id: 1 });
    this.set('destroy', sinon.spy());
    this.render(hbs`
    {{#product-destroy onConfirm=(action destroy product)}}
      Remove
    {{/product-destroy}}
    `);
  });

  it('renders', function() {
    // renders component
    expect(find('[data-test-product-destroy-button]')).to.have.exist;
  });
});