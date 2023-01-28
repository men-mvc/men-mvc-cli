const path = require('path');
const clone = require('git-clone');
const shell = require('shelljs');

const repoLink = "https://github.com/men-mvc/men-mvc.git";

exports.cloneRepo = (targetPath) => {
    return new Promise(resolve => {
        clone(repoLink, targetPath, {}, () => {
           resolve();
        });
    })
}

exports.npmInstall = (folderPath) => {
    shell.cd(folderPath)
    shell.exec('npm i -f')
}
