
import DS from 'ember-data';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  serializeAttribute(snapshot, json, key, attribute) {
    if (attribute.options && attribute.options.onlyForRead) {
      return;
    }
    this._super(...arguments);
  }
});