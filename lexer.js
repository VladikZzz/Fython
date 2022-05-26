const moo = require('moo')
const fs = require('mz/fs')

let lexer = moo.compile({
    WS:      /[ \t]+/,
    comment: /\/\/.*?$/,
    number:  /0|[1-9][0-9]*/,
    string:  /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:  '(',
    rparen:  ')',
    dots: ':',
    semicolon: ';',
    arrow: '- >',
    greaterEqual: '>=',
    lessEqual: '<=',
    equal: '==',
    assign: '=',
    plus: '+',
    minus: '-',
    divide: '/',
    multiply: '*',
    modulus: '%',
    greater: '>',
    less: '<',
    and: '&',
    or: '|',
    not: '!',
    for: 'for',
    if: 'if',
    then: 'then',
    else: 'else',
    endIf: 'end if',
    enfLoop: 'end loop',
    while: 'while',
    def: 'def',
    is: 'is',
    leftCurl: '{',
    rightCurl: '}',
    record: 'record',
    endRecord: 'end record',
    comma: ',',
    dot: '.',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    NL:      { match: /\n/, lineBreaks: true },
})

async function main() {
    const code = (await fs.readFile("example.fy")).toString();
    lexer.reset(code);
    while (true) {
        const token = lexer.next();
        if(!token) {
            break;
        }
        console.log(token);
    }
}

main().catch(err => console.log(err.stack));
