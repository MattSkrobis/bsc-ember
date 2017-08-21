import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers'; // different find

describe('Integration | Component | category show', function() {
  setupComponentTest('category-show', {
    integration: true
  });
  it('renders', function() {
    this.set('category', { name: 'Black' });
    this.set('category.products', [{ name: 'iPhone' }]);
    this.render(hbs`{{category-show model=category}}`);
    expect(find('[data-test-category-show-products]').textContent).to.include('Phone');
  });
});
