#! /usr/bin/env node

const { program } = require('commander')
const { resolve } = require('path')

const oneMonthAgo = new Date()
oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)

const getProviderEmails = (user) => {
  return user.providerUserInfo.filter(({ email }) => email).map(({ providerId }) => providerId)
}

const getUserInfo = (user) => {
  const { providerUserInfo, lastSignedInAt } = user
  const providers = providerUserInfo ? providerUserInfo.map(({ providerId }) => providerId) : []
  if (user.phoneNumber) {
    providers.push('phone')
  }
  if (user.email && getProviderEmails(user).length == 0) {
    providers.push('email')
  }

  if (providers.length == 0) {
    providers.push('anonymous')
  }

  return {
    providers,
    loginLastMonth: new Date(parseInt(lastSignedInAt)) >= oneMonthAgo,
  }
}

const calculateStats = (jsonPath) => {
  const { users } = require(resolve(jsonPath))
  if (!users) {
    console.log('Confirm that the JSON file is valid, missing root "users" property.')
  }
  console.log(`Detected ${users.length} users, processing..`)
  const providers = {}
  for (const user of users) {
    const userInfo = getUserInfo(user)
    for (const provider of userInfo.providers) {
      if (!providers[provider]) {
        providers[provider] = { total: 0, lastMonth: 0 }
      }
      providers[provider].total += 1
      if (userInfo.loginLastMonth) {
        providers[provider].lastMonth += 1
      }
    }
  }
  console.log('Provider info:')
  for (const providerKey of Object.keys(providers)) {
    const provider = providers[providerKey]
    console.log(`${providerKey}: ${provider.total} total, ${provider.lastMonth} last month`)
  }
}

program
  .name('firebase-provider-stats')
  .version('1.0.0')
  .argument('<json>', 'firebase auth export file with user info')
  .action(calculateStats)

program.parse(process.argv)