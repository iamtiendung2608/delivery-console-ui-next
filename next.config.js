const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const { resolve } = require('path')

/** @type {import('next').NextConfig} */
module.exports = phase => {
  const nextConfig = {
    experimental: {
      serverActions: true
    },

    webpack(config, context) {
      // Disable react-devtools
      if (phase !== PHASE_DEVELOPMENT_SERVER) {
        config.plugins = [
          ...config.plugins,
          new context.webpack.DefinePlugin({
            __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
          })
        ]

        config.externals.push({
          'react-devtools': resolve(__dirname, './public/react-devtools.js')
        })
      }

      return config
    }
  }

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      reactStrictMode: false,
      experimental: {
        webVitalsAttribution: ['CLS', 'CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']
      },
      env: {
        API_ENDPOINT: 'http://localhost:8080'
      }
    }
  }

  return {
    ...nextConfig,
    poweredByHeader: false,
    env: {
      API_ENDPOINT: 'http://localhost:8080',
    }
  }
}
