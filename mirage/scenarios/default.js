export default function(server) {
  [1, 2, 3].forEach(function() {
    let category = server.create('category');
    let pictures = server.createList('picture', 3);
    server.createList('product', 3, { category, pictures });
  });
}
