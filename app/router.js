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
  this.route('messages', function() {
    this.route('new', { path: '/new' });
  }),
  this.route('checkout');
  this.route('preference-form');

  this.route('password-reset');
  this.route('password-forgotten');

  this.route('admin', function() {
    this.route('messages', function() {
      this.route('index');
    }),
    this.route('orders', function() {
      this.route('index');
      this.route('edit', { path: '/:order_id/edit' });
    });
    this.route('replies', function() {
      this.route('new', { path: '/:message_id/new' });
    });
  });
});

export default ApplicationRouter;
