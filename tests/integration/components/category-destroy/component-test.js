import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | category destroy', function() {
  setupComponentTest('category-destroy', {
    integration: true
  });

  it('renders', function() {
    this.set('category', { name: 'Old' });
    this.render(hbs`{{category-destroy}}`);
    expect(find('[data-test-category-destroy-button]')).to.exist;
  });
});
