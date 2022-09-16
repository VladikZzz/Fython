// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const fyLexer = require("./lexer");
var grammar = {
    Lexer: fyLexer,
    ParserRules: [
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "statement", "_"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_ml", "statement", "statements$ebnf$1"], "postprocess": 
        (data) => {
            const repeated = data[2];
            const restStatements = repeated.map(chunks => chunks[1]);
            return [data[1], ...restStatements];
        }
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["commentary"], "postprocess": id},
    {"name": "statement", "symbols": ["printFunc"], "postprocess": id},
    {"name": "statement", "symbols": ["lambda"], "postprocess": id},
    {"name": "statement", "symbols": ["forLoop"], "postprocess": id},
    {"name": "statement", "symbols": ["whileLoop"], "postprocess": id},
    {"name": "statement", "symbols": ["record"], "postprocess": id},
    {"name": "statement", "symbols": ["ifF"], "postprocess": id},
    {"name": "statement", "symbols": ["return"], "postprocess": id},
    {"name": "statement", "symbols": ["funcCall"], "postprocess": id},
    {"name": "statement", "symbols": ["operation"], "postprocess": id},
    {"name": "var_assign", "symbols": [(fyLexer.has("identifier") ? {type: "identifier"} : identifier), "__", (fyLexer.has("dots") ? {type: "dots"} : dots), "__", (fyLexer.has("type") ? {type: "type"} : type), "__", (fyLexer.has("is") ? {type: "is"} : is), "__", "expr", (fyLexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                var_type: data[4],
                var_value: data[8]
            }
        }
                },
    {"name": "var_assign", "symbols": [(fyLexer.has("identifier") ? {type: "identifier"} : identifier), "__", (fyLexer.has("dots") ? {type: "dots"} : dots), "__", (fyLexer.has("type") ? {type: "type"} : type), (fyLexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                var_type: data[4],
            }
        }
                },
    {"name": "var_assign", "symbols": [(fyLexer.has("identifier") ? {type: "identifier"} : identifier), "__", (fyLexer.has("assign") ? {type: "assign"} : assign), "__", "expr", (fyLexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                var_value: data[4],
            }
        }
                },
    {"name": "var_assign", "symbols": [(fyLexer.has("identifier") ? {type: "identifier"} : identifier), "__", (fyLexer.has("dots") ? {type: "dots"} : dots), "__", (fyLexer.has("type") ? {type: "type"} : type), "__", (fyLexer.has("is") ? {type: "is"} : is), "__", "operation", (fyLexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                var_type: data[4],
                var_oper: data[8]
            }
        }
                },
    {"name": "list_body", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]]
        }
                },
    {"name": "list_body", "symbols": [(fyLexer.has("lsqPar") ? {type: "lsqPar"} : lsqPar), "exprs", (fyLexer.has("rsqPar") ? {type: "rsqPar"} : rsqPar)], "postprocess": 
        (data) => {
            return data[1]
        }
                },
    {"name": "printFunc$ebnf$1$subexpression$1", "symbols": ["arg_list", "_"]},
    {"name": "printFunc$ebnf$1", "symbols": ["printFunc$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "printFunc$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "printFunc", "symbols": [(fyLexer.has("print") ? {type: "print"} : print), (fyLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "printFunc$ebnf$1", (fyLexer.has("rparen") ? {type: "rparen"} : rparen), (fyLexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": 
        (data) => {
            return {
                type: "printFunct",
                arguments: data[3] ? data[3][0] : []
            }
        }
                },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "arg_list", "symbols": ["arg_list", "__", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "forLoop", "symbols": [(fyLexer.has("forF") ? {type: "forF"} : forF), "__", (fyLexer.has("identifier") ? {type: "identifier"} : identifier), "__", {"literal":"in"}, "__", (fyLexer.has("number") ? {type: "number"} : number), (fyLexer.has("dotes") ? {type: "dotes"} : dotes), (fyLexer.has("number") ? {type: "number"} : number), "__", "loop_body"], "postprocess": 
        (data) => {
            return {
                type: "forLoop",
                var_name: data[2],
                var_value1: data[6],
                var_value2: data[8],
                body: data[10]
            }
        }
                },
    {"name": "whileLoop", "symbols": [(fyLexer.has("whileF") ? {type: "whileF"} : whileF), "__", (fyLexer.has("lparen") ? {type: "lparen"} : lparen), "operation", (fyLexer.has("rparen") ? {type: "rparen"} : rparen), "__", "loop_body"], "postprocess": 
        (data) => {
            return {
                type: "whileLoop",
                condition: data[3],
                body: data[6]
            }
        }
                },
    {"name": "ifF", "symbols": [(fyLexer.has("ifF") ? {type: "ifF"} : ifF), "__", (fyLexer.has("lparen") ? {type: "lparen"} : lparen), "operation", (fyLexer.has("rparen") ? {type: "rparen"} : rparen), "__", "if_body"], "postprocess": 
        (data) => {
            return {
                type: "ifF",
                condition: data[3],
                body: data[6]
            }
        }
                },
    {"name": "ifF", "symbols": [(fyLexer.has("ifF") ? {type: "ifF"} : ifF), "__", (fyLexer.has("lparen") ? {type: "lparen"} : lparen), "operation", (fyLexer.has("rparen") ? {type: "rparen"} : rparen), "__", "if_body", "_ml", (fyLexer.has("elseF") ? {type: "elseF"} : elseF), "_", "if_body"], "postprocess": 
        (data) => {
            return {
                type: "ifF",
                condition: data[3],
                body: data[6],
                elseBody: data[10]
            }
        }
                },
    {"name": "ifF", "symbols": [(fyLexer.has("ifF") ? {type: "ifF"} : ifF), "__", (fyLexer.has("lparen") ? {type: "lparen"} : lparen), "operation", (fyLexer.has("rparen") ? {type: "rparen"} : rparen), "__", "if_body", "_ml", (fyLexer.has("elseF") ? {type: "elseF"} : elseF), "_", "ifF"], "postprocess": 
        (data) => {
            return {
                type: "ifF",
                condition: data[3],
                body: data[6],
                elseBody: data[10]
            }
        }
                },
    {"name": "lambda$ebnf$1$subexpression$1", "symbols": ["param_list"]},
    {"name": "lambda$ebnf$1", "symbols": ["lambda$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "lambda$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "lambda", "symbols": [(fyLexer.has("lparen") ? {type: "lparen"} : lparen), "lambda$ebnf$1", (fyLexer.has("rparen") ? {type: "rparen"} : rparen), "__", (fyLexer.has("arrow") ? {type: "arrow"} : arrow), "__", "lambda_body"], "postprocess": 
        (data) => {
            return {
                type: "lambda",
                params: data[1] ? data[1][0] : [],
                body: data[6]
            }
        }
                },
    {"name": "loop_body", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "loop_body", "symbols": [{"literal":"loop"}, "_", (fyLexer.has("NL") ? {type: "NL"} : NL), "statements", (fyLexer.has("NL") ? {type: "NL"} : NL), "_", (fyLexer.has("endLoop") ? {type: "endLoop"} : endLoop)], "postprocess": 
        (data) => {
            return data[3];
        }
                },
    {"name": "if_body", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "if_body", "symbols": [{"literal":"then"}, "_", (fyLexer.has("NL") ? {type: "NL"} : NL), "statements", (fyLexer.has("NL") ? {type: "NL"} : NL), "_", (fyLexer.has("endIf") ? {type: "endIf"} : endIf)], "postprocess": 
        (data) => {
            return data[3];
        }
                },
    {"name": "if_body", "symbols": [{"literal":"then"}, "_", (fyLexer.has("NL") ? {type: "NL"} : NL), "statements", (fyLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": 
        (data) => {
            return data[3];
        }
                },
    {"name": "if_body", "symbols": ["_", (fyLexer.has("NL") ? {type: "NL"} : NL), "statements", (fyLexer.has("NL") ? {type: "NL"} : NL), "_", (fyLexer.has("endIf") ? {type: "endIf"} : endIf)], "postprocess": 
        (data) => {
            return data[2];
        }
                },
    {"name": "lambda_body", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "lambda_body", "symbols": [(fyLexer.has("leftCurl") ? {type: "leftCurl"} : leftCurl), "_", (fyLexer.has("NL") ? {type: "NL"} : NL), "statements", (fyLexer.has("NL") ? {type: "NL"} : NL), "_", (fyLexer.has("rightCurl") ? {type: "rightCurl"} : rightCurl)], "postprocess": 
        (data) => {
            return data[3];
        }
                },
    {"name": "param", "symbols": [(fyLexer.has("type") ? {type: "type"} : type), "__", (fyLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
            return {
                type: "param",
                param_type: data[0],
                param_name: data[2]
            }
        }
            },
    {"name": "param_list", "symbols": ["param"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "param_list", "symbols": ["param_list", {"literal":","}, "_", "param"], "postprocess": 
        (data) => {
            return [...data[0], data[3]];
        }
                },
    {"name": "return", "symbols": [(fyLexer.has("returnF") ? {type: "returnF"} : returnF), "__", "expr", (fyLexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": 
        (data) => {
            return {
                type: "return",
                var_value: data[2]
            }
        }
                },
    {"name": "return", "symbols": [(fyLexer.has("returnF") ? {type: "returnF"} : returnF), "__", "operation", (fyLexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": 
        (data) => {
            return {
                type: "return",
                var_value: data[2]
            }
        }
                },
    {"name": "funcCall", "symbols": [(fyLexer.has("identifier") ? {type: "identifier"} : identifier), (fyLexer.has("lparen") ? {type: "lparen"} : lparen), "operation", (fyLexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
            return {
                type: "funcCall",
                name: data[0],
                body: data[2]
            }
        }
                },
    {"name": "funcCall", "symbols": [(fyLexer.has("identifier") ? {type: "identifier"} : identifier), (fyLexer.has("lparen") ? {type: "lparen"} : lparen), "exprs", (fyLexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
            return {
                type: "funcCall",
                name: data[0],
                body: data[2]
            }
        }
                },
    {"name": "exprs", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]]
        }
                },
    {"name": "exprs", "symbols": ["exprs", "_", "expr"], "postprocess": 
        (data) => {
            return [...data[0],data[2]]
        }
                },
    {"name": "exprs", "symbols": ["exprs", "_", {"literal":","}, "_", "expr"], "postprocess": 
        (data) => {
            return [...data[0],data[4]]
        }
                },
    {"name": "operation", "symbols": ["expr", "_", "operand", "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "operation",
                var_value1: data[0],
                var_value2: data[4],
                var_operation: data[2]
            }
        }
            },
    {"name": "operation", "symbols": [(fyLexer.has("true") ? {type: "true"} : true)], "postprocess": id},
    {"name": "operation", "symbols": [(fyLexer.has("false") ? {type: "false"} : false)], "postprocess": id},
    {"name": "record", "symbols": [(fyLexer.has("record") ? {type: "record"} : record)]},
    {"name": "expr", "symbols": [(fyLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(fyLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(fyLexer.has("true") ? {type: "true"} : true)], "postprocess": id},
    {"name": "expr", "symbols": [(fyLexer.has("false") ? {type: "false"} : false)], "postprocess": id},
    {"name": "expr", "symbols": [(fyLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expr", "symbols": ["lambda"], "postprocess": id},
    {"name": "expr", "symbols": ["ifF"], "postprocess": id},
    {"name": "expr", "symbols": ["funcCall"], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("greaterEqual") ? {type: "greaterEqual"} : greaterEqual)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("lessEqual") ? {type: "lessEqual"} : lessEqual)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("equal") ? {type: "equal"} : equal)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("plus") ? {type: "plus"} : plus)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("minus") ? {type: "minus"} : minus)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("divide") ? {type: "divide"} : divide)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("multiply") ? {type: "multiply"} : multiply)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("modulus") ? {type: "modulus"} : modulus)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("greater") ? {type: "greater"} : greater)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("less") ? {type: "less"} : less)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("and") ? {type: "and"} : and)], "postprocess": id},
    {"name": "operand", "symbols": [(fyLexer.has("or") ? {type: "or"} : or)], "postprocess": id},
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (fyLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (fyLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(fyLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(fyLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(fyLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (fyLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (fyLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "commentary", "symbols": [(fyLexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
