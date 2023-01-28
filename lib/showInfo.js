const showPostInstallationInfoMessage = (projectFolder) => {
    console.log("\x1b[36m", "####################### FYI #######################");
    console.log("\x1b[36m", 'It is safe to ignore \'1 high severity vulnerability\' warning as this CLI module is not part of your application.');
    console.log("\x1b[36m", 'Thanks for using MEN MVC CLI.');
    // console.log("\x1b[36m", "##################### What happens next? #####################");
    // console.log("\x1b[36m", `cd ${projectFolder} && npm i -f`);
}

showPostInstallationInfoMessage();
