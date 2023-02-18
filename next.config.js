const Dotenv = require('dotenv-webpack')

module.exports = {
  webpack: (config) => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({ silent: true }))

    config.module.rules.push({
      test: /\.(jpe?g|gif|png|svg|bmp)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 100000000,
          },
        },
      ],
    })
    config.resolve.modules.push(__dirname)
    return config
  },
  env: {
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL,
  },
}
