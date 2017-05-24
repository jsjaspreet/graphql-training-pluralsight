const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const ContestType = require('./contest')
const ActivityType = require('./activity')

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: (obj) => `${obj.firstName} ${obj.lastName}`
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    contests: {
      type: new GraphQLList(ContestType),
      resolve: (obj, args, { loaders }) => {
        return loaders.contestsByUserIds.load(obj.id)
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) => {
        return loaders.mdb.usersByIds.load(obj.id)
                      .then(res => res[fieldName])
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) => {
        return loaders.mdb.usersByIds.load(obj.id)
                      .then(res => res[fieldName])
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) => {
        return loaders.mdb.usersByIds.load(obj.id)
                      .then(res => res[fieldName])
      }
    },
    activities: {
      type: new GraphQLList(ActivityType),
      resolve: (obj, args, { loaders }) => {
        return loaders.activitiesByUserIds.load(obj.id)
      }
    }
  })
})