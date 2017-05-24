const { orderedFor } = require('../src/util')

module.exports = mPool => {
  return {
    getUsersByIds(userIds) {
      return mPool.collection('users')
                  .find({ userId: { $in: userIds } })
                  .toArray()
                  .then(rows => {
                    return orderedFor({ rows, collection: userIds, field: 'userId', singleObject: true })
                  })
    }
  }
}