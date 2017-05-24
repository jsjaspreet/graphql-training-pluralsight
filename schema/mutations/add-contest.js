const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const ContestType = require('../types/contest')
const pgdb = require('../../database/pgdb')

const ContestInputType = new GraphQLInputObjectType({
  name: 'ContestInput',
  fields: {
    apiKey: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  }
})

module.exports = {
  type: ContestType,
  args: {
    input: { type: new GraphQLNonNull(ContestInputType) }
  },
  resolve: (obj, { input }, { pgPool }) => {
    return pgdb(pgPool).addNewContest(input)
  }
}