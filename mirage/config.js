export default function() {
  this.passthrough('/write-coverage');
  // this.namespace = 'api';
  this.urlPrefix = 'http://localhost:3000';
  this.timing = 50;
  this.resource('products');
  this.resource('categories');
}
