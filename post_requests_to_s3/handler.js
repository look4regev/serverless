const AWS = require('aws-sdk')

const s3 = new AWS.S3()

module.exports.ping = async () => ({
  statusCode: 200, // A must in a route with AppEngine (LAMBDA-PROXY integration)
  body: JSON.stringify({
    message: Date.now()
  })
})

module.exports.save = async (event, context, callback) => {
  const randomNumber = Math.floor(Math.random() * 1000000)
  const currentEpoch = Date.now()
  const groupId = event.pathParameters.group
  const filename = `${groupId}/event_${currentEpoch}_${randomNumber}`

  const objectParams = {
    Bucket: process.env.BUCKET,
    Key: filename,
    Body: JSON.stringify({ request: event })
  }

  return s3
    .putObject(objectParams)
    .promise()
    .then(() => ({
      statusCode: 200,
      body: JSON.stringify({
        message: 'Done'
      })
    }))
    .catch(err => ({
      statusCode: 200, // Always return to client 200 and log the error in our side
      body: JSON.stringify({
        message: err
      })
    }))
    .then(v => callback(null, v), callback)
}
