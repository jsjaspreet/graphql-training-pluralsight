const {
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql')
const pgdb = require('../database/pgdb')

const UserType = require('./types/user')

// Root Query Type
const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    me: {
      type: UserType,
      description: 'The current user identified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, { key }, { loaders }) => {
        return loaders.usersByApiKeys.load(key)
      }
    }
  })
})

const AddContestMutation = require('./mutations/add-contest')
const AddNameMutation = require('./mutations/add-name')

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    AddContest: AddContestMutation,
    AddName: AddNameMutation
  })
})

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

module.exports = ncSchema