#Thursday

##Vim
  $ - end of the line
  0 - beginning of the line
  c - change
  d - delete 
  DD - remove whole line
  P - paste 
  v - visual mode
  i - insert mode
  r - replace
  Esc - returns to normal mode

## Page object collection
- collection option of the page objects allows to greatly simplify code, product-thumb can be found 
```` javascript
  products: collection({
    itemScope: '[data-test-product-thumb]',
    item: {
      open: clickable('[data-test-product-thumb-link]'),
      delete: clickable('[data-test-product-destroy-button]'),
      cancelDelete: clickable('[data-test-product-destroy-cancel-button]'),
      confirmDelete: clickable('[data-test-product-destroy-confirm-button]')
    }
  })
````
- functions on page objects can be chained
```` javascript
  await page.openProducts()
    .openNewProduct()
    .editProductName('FNX 45')
    .saveProduct();
````
- sinon.js 

#Wednesday

# Tuesday

## ember-cli-sass

## Useful testing packages
https://github.com/cibernox/ember-native-dom-helpers
https://github.com/simplabs/ember-test-selectors
http://ember-cli-page-object.js.org/docs/v1.8.x/

## Components
- new components were added
  - edit which is a form because of convention and proper setting of route in route.js, 
    this.route('products', function() {
    this.route('edit', { path: '/:product_id/edit' });,
    explicit search for the product was not necessary (:product_id is very important in this)
- actions like save() are declared like that, in component.js
  ```` js
  export default Component.extend({
    actions: {
      save() {
        this.product.save()
          .catch((error) => alert(error));
      }
    }
  });
  ````
(edit, thumb, actions:[])

## Integration component test
- integration tests ensure that component renders properly with given data, this cannot test transition between pages because there is no router in place 
(we ensure component renders properly with given data, (no transition testing, link-to) the process of transition from .. to ..)
  ```` js
  setupComponentTest('product-edit', {
    integration: true
  });

  it('renders', function() {
    this.set('product', { name: 'Phone', description: 'Black', sku: 1 });
    this.render(hbs`{{product-edit product=product}}`);
    expect(find('[data-test-product-form-name]').value).to.include('Phone');
  });
````
## Acceptance test
- integration tests ensure the application is working properly
- without the use of page object
  //
    ...
    await visit('/products');
    await click('[data-test-product-thumb-link]');
    expect(find('[data-test-product-show-name]').textContent)
      .to.include('Personal Computer');
    await click('[data-test-products-link]');
    ...
- with page object 
  //pages/product.js
    import {
      create,
      visitable,
      clickable,
      text
    } from 'ember-cli-page-object';

    export default create({
      visit: visitable('/products'),
      openProduct: clickable('[data-test-product-thumb-link]'),
      productName: text('[data-test-product-show-name]'),
      openProducts: clickable('[data-test-products-link]')
    });

// acceptance/products.js
  ...
    await page.visit();
    await page.openProduct();
    expect(page.productName).to.include('Personal Computer');
  ...
(we ensure the application is working properly, the process of transition from .. to ..)

# Monday

## Routing, template, components

for picture, look in /TIL (ember.concepts.png)

- router - is the best place to load data connected to the application path (/products - all products, /proudcts/1 - one product)
- products router - loads data using model() hook (all products)
- products template - we invoke component product-thumb for each element of products collection(available through model) with param product=product
- product-thumb component - has access to product inside template.hbs and component.js (this.product)

## Mirage
(what that is, factories, default scenario)

## Components
- components can be generated using ember g component --pod component-name, pods are creating a neat structure of tempate.hbs and component.js in the component-name folder. 
note: the name of a component has to contain dash 
(--pod, show, listing)

# Thursday

## Linters
https://github.com/DockYard/eslint-plugin-ember-suave
https://github.com/rwjblue/ember-cli-template-lint
https://github.com/rwjblue/ember-template-lint
- all in all - tools that are used to detect foul code style
(cli-linter, eslinter, template-linter, suave)

## Testing environment
- qunit default was replaced with mocha (https://mochajs.org/ which is a test framework running on Node and in browser
- chai, a assertion library, was also added
- phantomjs, an old headless browser was replaced with the chrome, run in its headless mode
(mocha, chrome headless, chai, phantomjs)

## Runtime
- node version manager - a way to manage multiple different node versions
- yarn - package manager
  - interesting feature of yarn interactive-update that allows selection of the packages to be updated
(nvm, node, yarn, yarn interactive-update)

# Friday

## Continuous Integration and Deployment
- travis was setup with proper config 
  - repository were set
  - curl -o- -L https://yarnpkg.com/install.sh | bash in travis.yml of ember app
  - badges were added to respective repositories
- both backend were deployed to heroku
  - frontend
    - automatic deployments if master is green
    - ember build pack https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz
  - backend
    - automatic deployments if master is green 
    - standard configuration (database)
(travis, heroku, ember-buildpack)

## Javascript Transpilation
https://guides.emberjs.com/v2.14.0/configuring-ember/build-targets/
in targets.js it can be specified which browsers are supposed to work with app, 
old code is bigger than new one, user of new browser do not necessarily want to have the option to run the app on older browsers
given which version is to be supported, the uglifier has to be updated accordingly 
(targets.js (backward compatibility of JS and change of uglifier accordingly))

## Connecting with RoR backend
backend
https://github.com/cyu/rack-cors
https://github.com/cerebris/jsonapi-resources
- update of cors.rb 
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'localhost:4200', 'https://bsc-ember.herokuapp.com'

      resource '/users*',
        headers: :any,
        methods: [:get, :options, :head]
    end
  end
- adding a resource
  class UserResource < JSONAPI::Resource
    attributes :first_name, :last_name, :email
  end
- adding a controller
- adding a route (jsonapi_resources :users)

frontend
https://www.emberjs.com/api/ember-data/2.14/classes/DS.Adapter

- adapter
  import DS from 'ember-data';
  import ENV from '../config/environment';

  const {
    JSONAPIAdapter
  } = DS;

  export default JSONAPIAdapter.extend({
    host: ENV.APP.host
  });

- environment variables 
  /* eslint-env node */
  'use strict';

  module.exports = function(environment) {
    let ENV = {
      modulePrefix: 'bsc-ember',
      environment,
      rootURL: '/',
      locationType: 'auto',
      EmberENV: {
       ...
      },

      APP: {
        host: 'http://localhost:3000'
      }
    };

    ...

    if (environment === 'production') {
      ENV.APP.host = 'https://bsc-ember-backend.herokuapp.com'
    }

    return ENV;
  };

(cors.rb, JSONAPI (resource, controller, route), ember data adapter, environment variables in ember)

## Testing communication with backend
  (frontend: user model, user list route, user list template, user list component)
  - user model 

  (backend: user model, controller, resource, route, cors.rb)