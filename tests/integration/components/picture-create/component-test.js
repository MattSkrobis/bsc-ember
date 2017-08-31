import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | language select', function() {
  setupComponentTest('language-select', {
    integration: true
  });

  it('renders', function() {
    this.render(hbs`{{language-select}}`);
    expect(find('[data-test-language-select]')).to.exist;
  });
});
