export default function(server) {
  [1, 2, 3].forEach(function() {
    let category = server.create('category');
    [1, 2].forEach(function() {
      let product = server.create('product', { category });
      [1, 2].forEach(function() {
        server.create('picture', { product });
      });
    });
  });
}
