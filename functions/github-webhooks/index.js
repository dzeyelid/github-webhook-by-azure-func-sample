const { createHmac } = require('crypto')

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')

  // Verify secret with x-hub-signature-256 header
  const signature = req.headers['x-hub-signature-256'].replace('sha256=', '')

  const hmac = createHmac('sha256', `${process.env.GITHUB_WEBHOOKS_SECRET}`)
  hmac.update(JSON.stringify(req.body))
  const encoded = hmac.digest('hex')

  if (encoded === signature) {
    context.log('The sent body matches the signature.')
  } else {
    context.log('The sent body does not match the signature.')
    context.res = {
      status: 401,
      body: 'The sent body does not match the signature.'
    }
  }

  // TODO: Do something

  // debug
  context.log(`Request body: ${JSON.stringify(req.body)}`)
}
