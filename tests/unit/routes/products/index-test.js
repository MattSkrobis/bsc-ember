import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | products/index', function() {
  setupTest('route:products/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  it('exists', function() {
    let route = this.subject();
    expect(route).to.be.ok;
  });
});
