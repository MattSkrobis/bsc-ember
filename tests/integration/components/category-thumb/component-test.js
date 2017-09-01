import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | category thumb', function() {
  setupComponentTest('category-thumb', {
    integration: true
  });

  beforeEach(function() {
    this.set('category', { name: 'A category!' });
    this.render(hbs`{{category-thumb model=category}}`);
  }),

  it('renders', function() {
    expect(find('[data-test-category-thumb-name]').textContent).to.include('A cat');
  });
});