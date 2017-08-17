import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers'; // different find
import sinon from 'sinon';

describe('Integration | Component | confirm action', function() {
  setupComponentTest('confirm-action', {
    integration: true
  });

  beforeEach(function() {
    this.set('product', { name: 'Phone', description: 'Black', id: 1 });
    this.set('destroy', sinon.spy());
    this.render(hbs`
    {{confirm-action onConfirm=(action destroy product) 
      confirmShown=true
      warningMsg="This will remove the product, do you wish to proceed?"}}
    `);
  });

  it('click cancel on confirmation', function() {
    // click cancel hides buttons
    click('[data-test-cancel-button]');
    expect(find('[data-test-cancel-button]')).to.not.have.exist;
  });

  it('click confirm on confirmation', function() {
    // click confirm triggers action
    click('[data-test-confirm-button]');
    expect(this.get('destroy').calledOnce).to.be.true;
  });
});
