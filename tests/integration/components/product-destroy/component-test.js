import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers'; // different find
import sinon from 'sinon';

describe('Integration | Component | product destroy', function() {
  setupComponentTest('product-destroy', {
    integration: true
  });

  it('renders', function() {
    this.set('product', { name: 'Phone', description: 'Black', id: 1 });
    this.set('destroy', sinon.spy());
    this.render(hbs`
    {{#product-destroy onConfirm=(action destroy product)}}
      Remove
    {{/product-destroy}}
    `);
    // renders component
    expect(find('[data-test-product-destroy-button]')).to.have.exist;
  });

  it('click cancel on confirmation', function() {
    this.set('product', { name: 'Phone', description: 'Black', id: 1 });
    this.set('destroy', sinon.spy());
    this.render(hbs`
    {{#product-destroy onConfirm=(action destroy product)}}
      Remove
    {{/product-destroy}}
    `);
    // click cancel hides buttons
    click('[data-test-product-destroy-button]');
    click('[data-test-product-destroy-cancel-button]');
    expect(find('[data-test-product-destroy-cancel-button]')).to.not.have.exist;
  });

  it('click confirm on confirmation', function() {
    this.set('product', { name: 'Phone', description: 'Black', id: 1 });
    this.set('destroy', sinon.spy());
    this.render(hbs`
    {{#product-destroy onConfirm=(action destroy product)}}
      Remove
    {{/product-destroy}}
    `);

    // click confirm triggers action
    click('[data-test-product-destroy-button]');
    click('[data-test-product-destroy-confirm-button]');
    expect(this.get('destroy').calledOnce).to.be.true;
  });
});