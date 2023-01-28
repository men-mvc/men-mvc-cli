exports.showPostInstallationInfoMessage = () => {
    console.log("\x1b[36m", "####################### FYI #######################");
    console.log("\x1b[36m", 'It is safe to ignore \'1 high severity vulnerability\' warning as this CLI module is not part of your application.');
    console.log("\x1b[36m", 'Thanks for using MEN MVC CLI.');
}

exports.showVersion = () => {
    console.log("\x1b[36m", 'MEN MVC CLI - 1.1.2');
}
