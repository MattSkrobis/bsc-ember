import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.commerce.productAdjective();
  },
  visible() {
    return faker.random.boolean();
  }
});
