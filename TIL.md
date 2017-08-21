# Friday

## Ember-paper 
  [documentation](http://miguelcobain.github.io/ember-paper/#/) - Material Design Bootstrap in Ember. Comes with all necessary components that have wide variety of options.

## Whole new section - category
  - Implement routes and components that allow list, show, edit, add and remove categories. Noteworthy is that category will not be deleted if it has products in it.

  - even though in this case this would not change much as component is being rerendered instead of being in place all the time (basically, it is always created with the latest data), `init()` has been changed to `didReceiveAttr()` in (`-form` components), to 'enforce' good behaviour of having in mind if component is being rerenderd or not

# Thursday

## Route transition in component's action
  As routing is not available in a compoment out of the box, package [`ember-router-service-polyfill`](https://github.com/rwjblue/ember-router-service-polyfill) was used to gain access to it.
  This is to be removed as soon as v2.15 is in place
  
## New model - category
  Began implementation of category, that has many products, and its routes and components
  Noteworthy is the simplicity of setting relationship in ember data and the ease of creating appropriate default scenario in mirage

# Wednesday

## Ember changeset validations
- [ember changeset validations](https://github.com/DockYard/ember-changeset-validations/) - an addon to `ember-changeset` which is a function based library used for validations. A validation itself is an Object, which can contain already shipped, default validations as well as user-defined ones.

```` js
// templates/products/edit|new.js
{{product-form changeset=(changeset model productValidations) save=(action "save") rollback=(action "rollback")}}
````

```` js
// validations/product.js 
import {
  validatePresence,
  validateLength,
  validateNumber
} from 'ember-changeset-validations/validators';

export const productValidations =  {
  name: [validatePresence(true), validateLength({ min: 3 })],
  description: validateLength({ max: 255 }),
  sku: validateNumber({ integer: true })
};
````
```` js
// components/product-form/template.js 
<ul>
  {{#each changeset.errors as |errorSet|}}
    {{#each errorSet.validation as |error|}}
      <li>{{error}}</li>
    {{/each}}
  {{/each}}
</ul>
````
Without further modification, changeset is being validated on each change to it and the errors are displayed below of the form. Nothing, however, is preventing the incorrect form from being sent. To remedy this, the changes in controller are made.
```` js
//controllers/products/edit|new.js
import Ember from 'ember';
import { productValidations } from '../../validations/product';

const { Controller } = Ember;

export default Controller.extend({
  productValidations,
  actions: {
    save(changeset) {
      changeset.validate().then(()=>{
        if (changeset.get('isValid')) {
          changeset.save().then(()=>{
            this.transitionToRoute('products.index');
          });
        }
      });
    },
    rollback(changeset) {
      changeset.rollback();
    }
  }
});
````

# Friday

## Ember changeset 
- [ember changeset](https://github.com/DockYard/ember-changeset) - a set of valid changes on a object which then can be stored or discarded. Can be checked for correctness by passing a optional validation before save. A changeset can be created using a `changeset` helper.

```` js
// templates/products/edit|new.js
{{product-form changeset=(changeset model) save=(action "save") rollback=(action "rollback")}}
````

or by means of Javascript.

# Thursday

## Vim
  [based on this article](https://danielmiessler.com/study/vim/#language)

  vim can be considered a kind of language with its:
  - verbs
    - `d` - delete
    - `c` - change
    - `y` - yank/copy
    - `v` - visual character selection
    - `V` - visual line selection
  - modifiers 
    - `a` - around
    - `i` - inside
    - `t` - search and stop before it
    - `f` - search and land on it
    - `/` - find a string
  - nouns
    - `w` - word
    - `s` - sentence
    - `p` - paragraph
    - `t` - HTML/XML tag

  Out of these pieces a sentence can be created e.g.
   - `yip` - yank a paragraph you are in

  Other useful commands include:
  - `$` - end of the line
  - `0` - beginning of the line
  - `DD` - remove whole line
  - `P` - paste 
  - `v` - visual mode
  - `i` - insert mode
  - `r` - replace
  - `Esc` - returns to normal mode
  
## Page object collection
- [x] [ember page object](http://ember-cli-page-object.js.org/docs/v1.8.x/) - collection option of the page objects allows to greatly simplify code, product-thumb can be found 

```` javascript
  products: collection({
    itemScope: '[data-test-product-thumb]',
    item: {
      open: clickable('[data-test-product-thumb-link]'),
      delete: clickable('[data-test-product-destroy-button]'),
      cancelDelete: clickable('[data-test-cancel-button]'),
      confirmDelete: clickable('[data-test-confirm-button]')
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
- [x] [sinonjs documentation](https://github.com/csantero/ember-sinon) - used to create dummy functions (spies) and assert that they were called specific amount of times

# Wednesday

- TIL is important

# Tuesday

## ember-cli-sass

## Useful testing packages
(ember-native-dom-helpers) [https://github.com/cibernox/ember-native-dom-helpers]
(ember-test-selectors) [https://github.com/simplabs/ember-test-selectors]

## Components
- order: router -> route -> (controller) -> template -> component-name/{.hbs|.js}
- [x] [documentation on 'model()'](https://www.emberjs.com/api/ember/2.14/classes/Ember.Route/methods/model?anchor=model) 
- edit which is a form because of convention and proper setting of route in route.js, 

  ```` js
  this.route('products', function() {
  this.route('edit', { path: '/:product_id/edit' });,
  ````  
  explicit search for the product was not necessary (`:product_id` is very important in this)

- actions like `save()` are declared like that, in component.js
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

## Integration component test

- integration tests ensure that component renders properly with given data, this cannot test transition between pages because there is no router in place 
 
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
  ```` js
    ...
    await visit('/products');
    await click('[data-test-product-thumb-link]');
    expect(find('[data-test-product-show-name]').textContent)
      .to.include('Personal Computer');
    await click('[data-test-products-link]');
    ...
  ````
- with page object 
  ```` javascript
  // pages/product.js
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
  ````

  ```` javascript  
  ...
    await page.visit();
    await page.openProduct();
    expect(page.productName).to.include('Personal Computer');
  ...
  ````
(we ensure the application is working properly, the process of transition from .. to ..)

# Monday

## Routing, template, components

for picture, look in /TIL (ember.concepts.png)

- router - is the best place to load data connected to the application path (/products - all products, /proudcts/1 - one product)
- products router - loads data using model() hook (all products)
- products template - we invoke component product-thumb for each element of products collection(available through model) with param product=product
- product-thumb component - has access to product inside template.hbs and component.js (this.product)

## Mirage
- [x] [ember cli mirage](http://www.ember-cli-mirage.com/docs/v0.3.x/)
- fake server that runs in client, useful in development, as with standard ember config of models and routes, it can be employed to simulate proper backend until it is implemented

## Components
- components can be generated using `ember g component --pod component-name`, pods are creating a neat structure of `tempate.hbs` and `component.js` in the `component-name` folder. Note: the name of a component has to contain a dash 

# Thursday

## Linters
- [eslint-plugin-ember-suave](https://github.com/DockYard/eslint-plugin-ember-suave)

- [ember-cli-template-lint](https://github.com/rwjblue/ember-cli-template-lint)
- all in all - tools that are used to detect foul code style
(cli-linter, eslinter, template-linter, suave)

## Testing environment
- [x] qunit default was replaced with [mocha](https://mochajs.org/) which is a test framework running on Node and in browser
- [x] [chai](http://chaijs.com/api/bdd/), a assertion library, was also added
- [x] [ember-mocha](https://github.com/emberjs/ember-mocha/blob/master/README.md)
- phantomjs, an old headless browser was replaced with the chrome, run in its headless mode
(mocha, chrome headless, chai, phantomjs)

## Runtime
- node version manager - a way to manage multiple different node versions
- yarn - package manager
  - interesting feature of yarn interactive-update that allows selection of the packages to be updated
(nvm, node, yarn, `yarn interactive-update`)

# Friday

## Continuous Integration and Deployment
- travis was setup with proper config 
  - repository were set
  - `curl -o- -L https://yarnpkg.com/install.sh | bash` in `travis.yml` of ember app
  - badges were added to respective repositories
- both backend were deployed to heroku
  - frontend
    - automatic deployments if master is green
    - [ember build pack](https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz)
  - backend
    - automatic deployments if master is green 
    - standard configuration (database)

## Javascript Transpilation
[build-targets](https://guides.emberjs.com/v2.14.0/configuring-ember/build-targets/)
in `targets.js` it can be specified which browsers are supposed to work with app, 
old code is bigger than new one, user of new browser do not necessarily want to have the option to run the app on older browsers. given which version is to be supported, the uglifier has to be updated accordingly 

## Connecting with RoR backend
* Backend
- [x] [jsonapi resources](http://jsonapi-resources.com/v0.9/guide/index.htmli
- (https://github.com/cyu/rack-cors)
- https://github.com/cerebris/jsonapi-resources

- update of `cors.rb` 
  ```` ruby
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'localhost:4200', 'https://bsc-ember.herokuapp.com'

      resource '/users*',
        headers: :any,
        methods: [:get, :options, :head]
    end
  end
  ````

- adding a resource
  ```` ruby
  class UserResource < JSONAPI::Resource
    attributes :first_name, :last_name, :email
  end
  ````
- adding a controller
- adding a route (`jsonapi_resources :users`)

frontend

- [adapter](https://www.emberjs.com/api/ember-data/2.14/classes/DS.Adapter)
  ```` js
  import DS from 'ember-data';
  import ENV from '../config/environment';

  const {
    JSONAPIAdapter
  } = DS;

  export default JSONAPIAdapter.extend({
    host: ENV.APP.host
  });
  ````

- environment variables 

  ```` js
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
  ````
## Testing communication with backend
- testing was held on heroku, after deployment of both applications, by seeding backend's database with users and visually inspecting that request to API is being sent and users are being displayed. Tweaks to the configuration including backend's `allowed_origins` and frontends `host`.
