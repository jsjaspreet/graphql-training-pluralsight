const _ = require('lodash')
const humps = require('humps')

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  orderedFor: ({ rows, collection, field, singleObject }) => {
    const data = humps.camelizeKeys(rows)
    const inGroupsOfField = _.groupBy(data, field)
    return collection.map(element => {
      const elementArray = inGroupsOfField[element]
      if (elementArray) {
        return singleObject ? elementArray[0] : elementArray
      }
      return singleObject ? {} : []
    })
  },
  slug: str => {
    return str.toLowerCase().replace(/[\s\W-]+/, '-')
  }
};
