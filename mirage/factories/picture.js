import { Factory, association } from 'ember-cli-mirage';

export default Factory.extend({
  product: association(),
  url() {
    let groups = ['sports', 'cats', 'food', 'abstract'];
    let group = groups[Math.floor(Math.random() * groups.length)];
    return `http://lorempixel.com/400/200/${group}`;
  }
});
