const fetch = require('node-fetch');
const baseURL = `https://api.datamuse.com/words?rel_trg=`

async function categories(parent, args, context){
  const where = args.filter ?
  {
    OR: [
      { name_contains: args.filter}
    ]
  } : {}

  return await context.prisma.categories({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  })
}

async function keywords(parent, args, context){
  return await context.prisma.category({id: args.categoryId}).keywords()
}

async function fillKeywords(parent, args) {
  const { categoryName } = args
  const response = await fetch(`${baseURL}${categoryName}&max=10`)
  let data = await response.json()
  return data.map(datam => datam.word)
  // return data.map((datum, index) => {
  //   console.log(datum)
  //   return {
  //     name: datum.word
  //   }
  // })
}


module.exports = {
  categories,
  keywords,
  fillKeywords
}