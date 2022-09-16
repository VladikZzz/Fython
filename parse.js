const nearley = require("nearley");
const grammar = require("./grammar.js");
const fs = require("mz/fs.js");


//function to parse our program and generate AST
async function main() {

    //f.e. node parse.js ex1.fy  <-- 2nd index
    const filename = "./examples/"+process.argv[2];
    if(!filename) {
        console.log("please provide a Fython file");
        return;
    }
    const code = (await fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(code);
    if(parser.results.length > 2) {
        console.log("Error: ambiguous grammar detected " + parser.results.length);
    } else if(parser.results.length <= 2) {
        const ast = parser.results[0];
        const outputFileName = filename.replace(".fy", ".ast");
        await fs.writeFile(outputFileName, JSON.stringify(ast, null, " "));
        console.log(`Wrote result to ${outputFileName}`)
    } else {
        console.log("Check code structure. e.g. Unexpected new lines");
    }
}

main().catch(err => console.log(err.stack));


