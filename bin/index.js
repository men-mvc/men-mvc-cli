#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const createAppCommand = require('../lib/createAppCommand');

let projectFolder = null;

const showError = (message) => {
    console.log("\x1b[31m", message);
    process.exit();
}

const delay = (milliseconds = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    })
}

const execute = async () => {
    const args = process.argv;
    if (args.length <= 2) {
        showError("Project's folder name is missing.");
    }
    projectFolder = args[2];
    if (! projectFolder) {
        showError("Project's folder name is missing.");
    }
    if (fs.existsSync(projectFolder)) {
        showError("Folder with the same name already exists.");
    }
    fs.mkdirSync(projectFolder, { recursive: true });
    await createAppCommand.createApp(projectFolder);
    await delay(2000);
    const gitFolder = `${projectFolder}/.git`;
    if (! fs.existsSync(gitFolder)) {
        await delay(3000);
    }
    if (! fs.existsSync(gitFolder)) {
        fs.rmSync(projectFolder, { recursive: true });
        showError(`Timeout cloning the repository.`);
    }
    fs.rmSync(gitFolder, { recursive: true });
    // rename .env.example to .env
    fs.renameSync(path.join(projectFolder, `.env.example`), path.join(projectFolder, `.env`));
}

execute();
