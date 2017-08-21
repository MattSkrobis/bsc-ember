export default function(server) {
  [1, 2, 3].forEach(function() {
    let category = server.create('category');
    server.createList('product', 3, { category });
  });
}
