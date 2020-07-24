'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
    NODE_ENV: '"development"',
    EVN_CONFIG: '"dev"',
    API_ROOT: '"http://localhost:8090"'
}
