#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const createAppCommand = require('../lib/createAppCommand');
const showInfo = require('../lib/showInfo');

const timeoutErrorMessage = `It was taking longer than usual to clone the repository. Please try again.`;
let projectFolder = null;
let emptyFolderPreExisted = false;

const showError = (message) => {
    console.log("\x1b[31m", message);
    if (emptyFolderPreExisted) {
        deleteProjectFolder();
    }
    process.exit();
}

const delay = (milliseconds = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    })
}

const deleteProjectFolder = () => {
    if (! projectFolder) {
        return;
    }
    fs.rmSync(projectFolder, { recursive: true });
}

const createProjectFolder = () => {
    fs.mkdirSync(projectFolder, { recursive: true });
}

const isDirectory = (path) => {
    var stats = fs.statSync(path);

    return stats.isDirectory();
}

const isDirectoryEmpty = (path) => {
    return fs.readdirSync(path).length < 1;
}

const execute = async () => {
    const args = process.argv;
    if (args.length <= 2) {
        showError("Project's folder name is missing.");
    }
    if (args[2] === '--version') {
        showInfo.showVersion();
        process.exit();
    }
    projectFolder = args[2];
    if (! projectFolder) {
        showError("Project's folder name is missing.");
    }
    if (fs.existsSync(projectFolder)) {
        if (! isDirectory(projectFolder)) {
            showError("Folder/ file with the same name already exists.");
        }
        // if the folder and the folder is empty, it will proceed
        if (! isDirectoryEmpty(projectFolder)) {
            showError("Folder is not empty.");
        }
        emptyFolderPreExisted = true;
    }
    createProjectFolder();

    try  {
        await createAppCommand.cloneRepo(projectFolder);
    } catch (e) {
        showError(e.message);
    }
    /**
     * delete the .git folder
     * wait for up to 10 seconds
     */
    const gitFolder = path.join(projectFolder, ".git");
    for (let i=0; i< 10; i++) {
        if (! fs.existsSync(gitFolder)) {
            await delay();
        }
    }
    if (! fs.existsSync(gitFolder)) {
        showError(timeoutErrorMessage);
    }
    fs.rmSync(gitFolder, { recursive: true });
    /**
     * rename .env.example to .env
     * wait for up to 10 seconds
     */
    const exampleEnvPath = path.join(projectFolder, `.env.example`);
    for (let i=0; i< 10; i++) {
        if (! fs.existsSync(exampleEnvPath)) {
            await delay();
        }
    }
    if (! fs.existsSync(exampleEnvPath)) {
        showError(timeoutErrorMessage);
    }
    fs.renameSync(path.join(projectFolder, `.env.example`), path.join(projectFolder, `.env`));
    showInfo.showPostInstallationInfoMessage();
}

execute();
