const fs = require("mz/fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
    const filename = process.argv[2];
    if(!filename) {
        console.log("Please provide Fython file");
        return;
    }
    const astFname = filename.replace(".fy",".ast");
    const jsFname = filename.replace(".fy",".js");
    await myExec(`node parse.js ${filename}`);
    await myExec(`node generator.js ${astFname}`);
    await myExec(`node ./examples/${jsFname}`);
}

async function myExec(command) {
    const output = await exec(command);
    if(output.stdout) {
        process.stdout.write(output.stdout);
    }
    if(output.stderr) {
        process.stdout.write(output.stderr);
    }
}

main().catch(err => console.log(err.stack));