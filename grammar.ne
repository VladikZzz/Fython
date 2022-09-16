@{%
const fyLexer = require("./lexer");
%}

@lexer fyLexer

statements
    -> _ml statement (__lb_ statement _):*
        {%
            (data) => {
                const repeated = data[2];
                const restStatements = repeated.map(chunks => chunks[1]);
                return [data[1], ...restStatements];
            }
        %}

statement
    ->  var_assign     {% id %}
    |  commentary     {% id %}
    |  printFunc     {% id %}
    |  lambda         {% id %}
    |  forLoop      {% id %}
    |  whileLoop    {% id %}
    |  record       {% id %}
    |  ifF           {% id %}
    |  return       {% id %}
    |  funcCall     {% id %}
    |  operation    {% id %}

var_assign
    ->  %identifier __ %dots __ %type __ %is __ expr %semicolon
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    var_type: data[4],
                    var_value: data[8]
                }
            }
        %}
    |   %identifier __ %dots __ %type %semicolon
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    var_type: data[4],
                }
            }
        %}
    |   %identifier __ %assign __ expr %semicolon
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    var_value: data[4],
                }
            }
        %}
    |   %identifier __ %dots __ %type __ %is __ operation %semicolon
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    var_type: data[4],
                    var_oper: data[8]
                }
            }
        %}

list_body
    ->  expr
        {%
            (data) => {
                return [data[0]]
            }
        %}
    |  %lsqPar exprs %rsqPar
        {%
            (data) => {
                return data[1]
            }
        %}

printFunc
    -> %print %lparen _ (arg_list _):? %rparen %semicolon
        {%
            (data) => {
                return {
                    type: "printFunct",
                    arguments: data[3] ? data[3][0] : []
                }
            }
        %}

arg_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | arg_list __ expr
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}





forLoop
    -> %forF __ %identifier __ "in" __ %number %dotes %number __ loop_body
        {%
            (data) => {
                return {
                    type: "forLoop",
                    var_name: data[2],
                    var_value1: data[6],
                    var_value2: data[8],
                    body: data[10]
                }
            }
        %}


whileLoop
    -> %whileF __ %lparen operation %rparen __ loop_body
        {%
            (data) => {
                return {
                    type: "whileLoop",
                    condition: data[3],
                    body: data[6]
                }
            }
        %}

ifF
    -> %ifF __ %lparen operation %rparen __ if_body
        {%
            (data) => {
                return {
                    type: "ifF",
                    condition: data[3],
                    body: data[6]
                }
            }
        %}
    |  %ifF __ %lparen operation %rparen __ if_body _ml %elseF _ if_body
        {%
            (data) => {
                return {
                    type: "ifF",
                    condition: data[3],
                    body: data[6],
                    elseBody: data[10]
                }
            }
        %}
    |  %ifF __ %lparen operation %rparen __ if_body _ml %elseF _ ifF
        {%
            (data) => {
                return {
                    type: "ifF",
                    condition: data[3],
                    body: data[6],
                    elseBody: data[10]
                }
            }
        %}


lambda
    -> %lparen (param_list):? %rparen __ %arrow __ lambda_body
        {%
            (data) => {
                return {
                    type: "lambda",
                    params: data[1] ? data[1][0] : [],
                    body: data[6]
                }
            }
        %}


loop_body
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |   "loop" _ %NL statements %NL _ %endLoop
        {%
            (data) => {
                return data[3];
            }
        %}


if_body
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |   "then" _ %NL statements %NL _ %endIf
        {%
            (data) => {
                return data[3];
            }
        %}
    |  "then" _ %NL statements %NL
        {%
            (data) => {
                return data[3];
            }
        %}
    |  _ %NL statements %NL _ %endIf
        {%
            (data) => {
                return data[2];
            }
        %}

lambda_body
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  %leftCurl _ %NL statements %NL _ %rightCurl
        {%
            (data) => {
                return data[3];
            }
        %}

param
    -> %type __ %identifier
    {%
        (data) => {
            return {
                type: "param",
                param_type: data[0],
                param_name: data[2]
            }
        }
    %}

param_list
    -> param
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  param_list "," _ param
        {%
            (data) => {
                return [...data[0], data[3]];
            }
        %}

return
    -> %returnF __ expr %semicolon
        {%
            (data) => {
                return {
                    type: "return",
                    var_value: data[2]
                }
            }
        %}
    | %returnF __ operation %semicolon
        {%
            (data) => {
                return {
                    type: "return",
                    var_value: data[2]
                }
            }
        %}

funcCall
    -> %identifier %lparen operation %rparen
        {%
            (data) => {
                return {
                    type: "funcCall",
                    name: data[0],
                    body: data[2]
                }
            }
        %}
    |   %identifier %lparen exprs %rparen
        {%
            (data) => {
                return {
                    type: "funcCall",
                    name: data[0],
                    body: data[2]
                }
            }
        %}

exprs
    -> expr
        {%
            (data) => {
                return [data[0]]
            }
        %}
    |  exprs _ expr
        {%
            (data) => {
                return [...data[0],data[2]]
            }
        %}
    |  exprs _ "," _ expr
        {%
            (data) => {
                return [...data[0],data[4]]
            }
        %}

operation
    -> expr _ operand _ expr
    {%
        (data) => {
            return {
                type: "operation",
                var_value1: data[0],
                var_value2: data[4],
                var_operation: data[2]
            }
        }
    %}
    | %true     {% id %}
    | %false    {% id %}

record
    -> %record

expr
    ->  %string     {% id %}
    |   %number     {% id %}
    |   %true     {% id %}
    |   %false     {% id %}
    |   %identifier    {% id %}
    |   lambda      {% id %}
    |   ifF       {% id %}
    |   funcCall    {% id %}

operand
    ->  %greaterEqual {% id %}
    |   %lessEqual {% id %}
    |   %equal {% id %}
    |   %plus {% id %}
    |   %minus {% id %}
    |   %divide {% id %}
    |   %multiply {% id %}
    |   %modulus {% id %}
    |   %greater {% id %}
    |   %less {% id %}
    |   %and {% id %}
    |   %or {% id %}


#line break
__lb_ -> (_ %NL):+ _

#multi-line whitespaces:
_ml -> (%WS | %NL):*

# Mandatory whitespace
__ -> %WS:+

# Optional whitespace
_ -> %WS:*

commentary
    -> %comment    {% id %}

