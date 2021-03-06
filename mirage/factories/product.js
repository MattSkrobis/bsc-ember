import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  category: association(),
  name() {
    return faker.commerce.productName();
  },
  description() {
    return faker.lorem.sentence();
  },
  sku() {
    return faker.random.number();
  },
  availability() {
    return faker.random.boolean();
  },
  price() {
    return faker.commerce.price();
  },
  currency: 'EUR',
  quantity() {
    return faker.random.number();
  }
});
