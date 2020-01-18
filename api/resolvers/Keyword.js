
function category(root, args, context) {
  console.log(root);
  return context.prisma
    .keyword({
      id: root.id,
    })
    .category()
}

module.exports = {
  category
}
