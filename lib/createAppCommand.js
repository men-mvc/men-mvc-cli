const path = require('path');
const clone = require('git-clone');
const{ execSync } = require('child_process');

const repoLink = "https://github.com/men-mvc/men-mvc.git";

exports.cloneRepo = (targetPath) => {
    return new Promise(resolve => {
        clone(repoLink, targetPath, {}, () => {
           resolve();
        });
    })
}
