import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers'; // different find

describe('Integration | Component | user form', function() {
  setupComponentTest('user-form', {
    integration: true
  });
  it('renders', function() {
    this.set('user', { firstName: 'Fred', lastName: 'Sinatra' });
    this.render(hbs`{{user-form user=user}}`);
    expect(find('[data-test-user-form-name] input').value).to.eq('Fred');
  });
});
