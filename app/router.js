import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;

const ApplicationRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

ApplicationRouter.map(function() {
  this.route('users-list');
  this.route('products', function() {
    this.route('product', { path: '/:product_id' });
  });
});

export default ApplicationRouter;
