
function keywords(root, args, context) {
  return context.prisma
    .category({
      id: root.id,
    })
    .keywords()
}

module.exports = {
  keywords
}
