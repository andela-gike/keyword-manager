async function postCategory (parent, args, context) {
  return await context.prisma.createCategory({
    name: args.name
  })
}

async function removeCategory (parent, args, context) {
  console.log(args)
  return await context.prisma.deleteCategory({
    id: args.categoryId
  })
}

async function postKeyword (parent, args, context) {
  return await context.prisma.createKeyword({
    name: args.name,
    category: {
      connect: {id: args.categoryId}
    }
  })
}

async function removeKeyword (parent, args, context) {
  console.log(args, 'here')
  return await context.prisma.deleteKeyword({
    id: args.keywordId
  })
}

module.exports = {
  postCategory,
  postKeyword,
  removeCategory,
  removeKeyword
}