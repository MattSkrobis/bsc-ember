## Routing, template, components

for picture, look in /TIL (ember.concepts.png)

- router - is the best place to load data connected to the application path (/products - all products, /proudcts/1 - one product)
- products router - loads data using model() hook (all products)
- products template - we invoke component product-thumb for each element of products collection(available through model) with param product=product
- product-thumb component - has access to product inside template.hbs and component.js (this.product)