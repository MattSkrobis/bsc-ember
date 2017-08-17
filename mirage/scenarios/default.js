export default function(server) {
  [1, 2, 3].forEach(function(i) {
    let category = server.create('category');
    server.createList('product', 3, { category });
  });
}
