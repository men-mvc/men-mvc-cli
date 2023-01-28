const clone = require('git-clone');

exports.cloneRepo = async (targetPath) => await clone('https://github.com/men-mvc/men-mvc.git', targetPath)
