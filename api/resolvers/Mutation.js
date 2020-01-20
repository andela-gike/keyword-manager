const Query = require('./Query');

async function postCategory (parent, args, context) {
const prefilledKey = await Query.fillKeywords(parent, {categoryName: args.name})
  return await context.prisma.createCategory({
    name: args.name,
    keywords: {
      create: prefilledKey.map(eachWord => {
        return {
          name: eachWord
        }
      })
    }
  })
}

async function removeCategory (parent, args, context) {
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