const faker = require(`faker`)
const matter = require(`gray-matter`)

const MAX_NUM_ROWS = parseInt(process.env.MAX_NUM_ROWS || 1000, 10)

module.exports = index => `
${matter
  .stringify(``, {
    date: faker.date.between('2015-01-01', new Date()),
    title: faker.lorem.sentence(),
    slug: `/${faker.helpers.slugify(faker.lorem.sentence())}`,
  })
  .trim()}

## Page #${index}

### API

|Name|Description|Required|
|:--:|-----------|--------|
${new Array(faker.datatype.number(MAX_NUM_ROWS))
  .fill(undefined)
  .map(() =>
    `
|${faker.lorem.word()}|${faker.lorem.sentence()}|${faker.datatype.boolean()}|
`.trim()
  )
  .join(`\n`)}

### More Detail

${faker.lorem.paragraphs()}
`
