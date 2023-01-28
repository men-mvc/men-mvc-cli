// ./cli.js
// #!/usr/bin/env node
//
// let command = require('./command')
//
// command()
const clone = require('git-clone');

exports.createApp = async (targetPath) => await clone('https://github.com/men-mvc/men-mvc.git', targetPath)
