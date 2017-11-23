import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;

const ApplicationRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

ApplicationRouter.map(function() {
  this.route('products', function() {
    this.route('product', { path: '/:product_id' });
    this.route('edit', { path: '/:product_id/edit' });
    this.route('new', { path: '/new' });
  });
  this.route('categories', function() {
    this.route('category', { path: '/:category_id' });
    this.route('edit', { path: '/:category_id/edit' });
    this.route('new', { path: '/new' });
  });
  this.route('login');

  this.route('users', function() {
    this.route('edit');
  });
  this.route('checkout');
  this.route('preference-form');
});

export default ApplicationRouter;
