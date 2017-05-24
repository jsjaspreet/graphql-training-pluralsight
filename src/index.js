const { nodeEnv } = require('./util')
console.log(`Running in ${nodeEnv} mode...`)

const pg = require('pg')
const pgConfig = require('../config/pg')[nodeEnv]
const pgPool = new pg.Pool(pgConfig)

const DataLoader = require('dataloader')
const pgdb = require('../database/pgdb')(pgPool)
const ncSchema = require('../schema')
const graphqlHTTP = require('express-graphql')

const app = require('express')()

const { MongoClient, Logger } = require('mongodb')
const assert = require('assert')
const mConfig = require('../config/mongo')[nodeEnv]

MongoClient.connect(mConfig.url, (err, mPool) => {
  assert.equal(err, null)

  const mdb = require('../database/mdb')(mPool)

  app.use('/graphql', (req, res) => {
    const loaders = {
      usersByIds: new DataLoader(pgdb.getUsersByIds),
      usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
      contestsByUserIds: new DataLoader(pgdb.getContestsForUserIds),
      namesByContestIds: new DataLoader(pgdb.getNamesForContestIds),
      totalVotesByNameIds: new DataLoader(pgdb.getTotalVotesByNameIds),
      activitiesByUserIds: new DataLoader(pgdb.getActivitiesForUserIds),
      mdb: {
        usersByIds: new DataLoader(mdb.getUsersByIds)
      }
    }
    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      context: { loaders, pgPool, mPool }
    })(req, res)
  })

  const PORT = process.env.PORT || 6060
  app.listen(PORT, () => console.log(`App running on port ${PORT}`))
})



