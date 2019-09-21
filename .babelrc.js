module.exports = {
      "presets": [
      [
        "@babel/preset-env",
          {
            "modules": false,
            "useBuiltIns": "usage",
            "shippedProposals": true,
            "corejs": {
              "version": 3,
              "proposals": false
            },
            "debug": process.env.NODE_ENV === 'production'
          }
      ],
      "@babel/preset-react"
    ],
    "plugins": process.env.NODE_ENV === 'development' 
    ? ['react-hot-loader/babel'] 
    : []
}