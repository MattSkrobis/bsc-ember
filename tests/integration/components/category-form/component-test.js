import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | category form', function() {
  setupComponentTest('category-form', {
    integration: true
  });
  it('renders', function() {
    this.set('category', { name: 'White', visible: true });
    this.render(hbs`{{category-form model=category}}`);
    expect(find('[data-test-category-form-name]').value).to.eq('White');
  });
});
