const fs = require('mz/fs')

async function main() {
    const filename = "./examples/"+process.argv[2];
    if(!filename) {
        console.log("please provide an .ast file");
        return;
    }
    const fileJson = (await fs.readFile(filename)).toString();
    const ast = JSON.parse(fileJson);
    const jsCode = generate(ast);
    const outputFileName = filename.replace(".ast", ".js");
    await fs.writeFile(outputFileName, jsCode);
    console.log(`Wrote result to ${outputFileName}`)

}

function generate(ast) {
    const results = [];
    let types = [];
    let values = [];
    let func_names = [];
    for (let statement of ast) {
        const line = generateForLine(statement, types, values,func_names);
        results.push(line);
    }
    return results.join("\n");
}

function generateForLine(line, types, values, func_names) {
    //if below creates the list of all the functions that exist in .fy file and save them
    if(!(line === undefined)) {
        if(!(line.var_value === undefined)) {
            if(!(line.var_name === undefined)) {
                func_names.push(line.var_name.value);
            }
        }
    }
    //in the if below, it checks if the print function, that calls a function:
    // 1. Calls existing function from our list
    // 2. Checks if type of argument corresponds with type of function(that is saved in type list)
    if(!(line === undefined)) {
        if(line.type === "printFunct") {
            if(line.arguments[0].type === "funcCall") {
                if(func_names.includes(line.arguments[0].name.value)) {
                    if(line.arguments[0].body[0].type === "number") {
                        if(!(types.includes("Int"))) {
                            throw new Error("Types are not corresponding");
                        }
                    } else if(line.arguments[0].body[0].type === "string") {
                        if (!(types.includes("String"))) {
                            throw new Error("Types are not corresponding");
                        }
                    } else {
                        if (!(types.includes("Bool"))) {
                            throw new Error("Types are not corresponding");
                        }
                    }
                }
            }
        }
    }
    let js = "";
    if(line.type === "var_assign") {
        let varName = undefined;
        let varValue = undefined;
        let varType = undefined;
        let varNot = undefined;
        let varValue1 = undefined;
        let varValue2 = undefined;
        let varOper = undefined;
        if ("var_not" in line) {
            varNot = line.var_not.value;
        }
        if("var_name" in line) {
            varName = line.var_name.value;
        }
        if("var_type" in line) {
            varType = line.var_type.value;
        }
        if("var_value" in line) {
            varValue = line.var_value.value;
        }
        if("var_value1" in line) {
            varValue1 = line.var_value1.value;
        }
        if("var_value2" in line) {
            varValue2 = line.var_value2.value;
        }
        if("var_oper" in line) {
            varOper = line.var_oper;
        }
        if(!(varName === undefined)) {
            if(!(varType === undefined)) {
                if(!(varValue === undefined)) {
                    if(!(varNot === undefined)) {
                        if((varType === "Bool")) {
                            js = `var ${varName} = !${varValue}`;
                        } else {
                            console.log("Error: !(not) operation can be used only for Bool variable");
                        }
                    } else {
                        js = `var ${varName} = ${varValue};`
                    }
                } else {
                    if(!(varOper === undefined)) {
                        js = `var ${varName} = ${varOper.var_value1.value} ${varOper.var_operation.value} ${varOper.var_value2.value}`
                        console.log(js)
                    } else {
                        js = `var ${varName};`
                    }
                }
            } else {
                if(!(varValue === undefined)) {
                    js = `var ${varName} = ${varValue};`
                } else {
                    if(line.var_value.type === "lambda"){
                        let params = line.var_value.params;
                        js = `function ${varName}(`;
                        for(let i = 0; i < params.length; i++) {
                            if(i == params.length-1) {
                                js += params[i].param_name.value;
                            } else {
                                js += params[i].param_name.value += ",";
                            }
                            types.push(params[i].param_type.value);
                            values.push(params[i].param_name.value);
                        }
                        js += `) {`;
                        let bodyList = line.var_value.body.map((arg) => {
                            return generateForLine(arg, types, values,func_names);
                        });
                        for(let bodyPart of bodyList) {
                            js += `\n${bodyPart}`
                        }
                        js += `\n}`
                    } else{
                        console.log("Error: please enter value of variable");
                    }
                }
            }
        } else {
            console.log("Error: please enter name of variable");
        }
    }
    if(line.type === "printFunct") {
        js = "console.log(";
        for(let i = 0; i < line.arguments.length; i++) {
            if(i == line.arguments.length-1) {
                if(line.arguments[i].type === "funcCall") {
                    js+=line.arguments[i].name.value += "(";
                    for(let j = 0; j < line.arguments[i].body.length; j++) {
                        if(!(line.arguments[i].body[j].value === undefined)) {
                            js += line.arguments[i].body[j].value + ",";
                        } else {
                            if(!(line.arguments[i].body[j].body === undefined)) {
                                let bodyList = generateForLine(line.arguments[i].body[j], types, values,func_names) + "(";
                                let l = line.arguments[i].body[j].body.length;
                                for(let f = 0; f < l; f++) {
                                    if(f === l - 1) {
                                        bodyList += line.arguments[i].body[j].body[f].value;
                                    } else {
                                        bodyList += line.arguments[i].body[j].body[f].value + ",";
                                    }
                                }
                                bodyList += ")";
                                js += bodyList;
                            }
                        }
                    }
                    js += ")";
                } else if(line.arguments[i].type === "operation") {
                    let bodyList1 = "";
                    if(!(line.arguments[i] === undefined)) {
                        if(line.arguments[i].var_value.length>1) {
                            bodyList1 += line.arguments[i].var_value.map((arg) => {
                                return generateForLine(arg, types, values,func_names);
                            }).join();
                        }
                        console.log(bodyList1);
                    }
                } else {
                    js += `${line.arguments[i].value}`;
                }
            } else {
                if(line.arguments[i].type === "funcCall") {
                    js+=line.arguments[i].name.value;
                    //console.log(js)
                } else if(line.arguments[i].type === "operation") {
                    let bodyList1 = "";
                    if(line.arguments[i].var_value.length>1) {
                        bodyList1 += line.var_value.arguments[i].var_value.map((arg) => {
                            return generateForLine(arg, types, values,func_names);
                        }).join();
                    }
                } else {
                    js += `${line.arguments[i].value},`;
                }
            }
        }
        js += ");";
    }
    if(line.type === "return") {
        js = `return `;
        if(!(line.var_value.value === undefined)) {
            js += `${line.var_value.value};`;
        } else {
            if (line.var_value.type === "operation") {
                let varOper = line.var_value.var_operation.value;
                let bodyList1 = "";
                let bodyList2 = "";
                if(!(line.var_value.var_value1.type === undefined) && !(line.var_value.var_value2.type === undefined)) {
                    if(line.var_value.var_value1.type === "funcCall") {
                        bodyList1 += line.var_value.var_value1.name.value;
                        let bodyVar1 = line.var_value.var_value1.body;
                        bodyList1 += generateForLine(bodyVar1,types, values,func_names);
                    }
                    else {
                        bodyList1 += line.var_value.var_value1.value;
                    }
                    if(line.var_value.var_value2.type === "funcCall") {
                        bodyList2 += line.var_value.var_value2.name.value;
                        let bodyVar2 = line.var_value.var_value2.body;
                        bodyList2 += generateForLine(bodyVar2,types ,values,func_names);
                    }
                    else {
                        bodyList2 += line.var_value.var_value2.value;
                    }
                    js += `${bodyList1} ${varOper} ${bodyList2};`;
                } else {
                    console.log("Error:  both values of operation should be of the same type operation");
                }
            }
        }
    }
    if(line.type === "funcCall") {
        js += `${line.name.value}`;
    }

    if(line.type === "whileLoop") {
        js += `while(`;
        if(!(line.condition.value === undefined)) {
            js += line.condition.value + ") {"
        }
        else {
            js += `${line.condition.var_value1.value} ${line.condition.var_operation.value} ${line.condition.var_value2.value}) {`
        }
        let bodyList = line.body.map((arg) => {
            return generateForLine(arg,types, values,func_names);
        });
        for(let bodyPart of bodyList) {
            js += `\n${bodyPart}`
        }
        js += `\n}`
    }

    if(line.type === "forLoop") {
        js += `for(let ${line.var_name.value} = ${line.var_value1.value};`;
        js += `${line.var_name.value} < ${line.var_value2.value}; ${line.var_name.value}++) {`
        let bodyList = line.body.map((arg) => {
            return generateForLine(arg, types, values,func_names);
        });
        for(let bodyPart of bodyList) {
            js += `\n${bodyPart}`
        }
        js += `\n}`
    }

    if(line.type === "list_assign") {
        js += `let ${line.var_name.value} = [`;
        for(let i = 0; i < line.var_value.length; i++) {
            if(i == line.var_value.length-1) {
                js += `${line.var_value[i].value}];`
            } else {
                js += `${line.var_value[i].value},`
            }
        }
    }

    if(line.type === "ifF") {
        js += `if(`
        if(!(line.condition.value === undefined)) {
            js += line.condition.value + ") {"
        }
        else {
            js += `${line.condition.var_value1.value} ${line.condition.var_operation.value} ${line.condition.var_value2.value}) {`
        }
        let bodyList = line.body.map((arg) => {
            return generateForLine(arg,types,values,func_names);
        });
        for(let bodyPart of bodyList) {
            js += `\n${bodyPart}`
        }
        js += `\n}`
        if(!(line.elseBody === undefined)) {
            js += '\nelse {'
            let bodyList1 = line.elseBody.map((arg) => {
                return generateForLine(arg,types, values,func_names);
            });
            for(let bodyPart1 of bodyList1) {
                js += `\n${bodyPart1}`
            }
            js += `\n}`
        }
    }

    if(line.type === "operation") {
        if(!(line.var_value1.value === undefined)) {
            if(line.type === "funCall") {
                js += `${line.var_value1.name.value}`;
            }
        if(!(line.var_value2.value === undefined)) {
            if(line.type === "funCall") {
                js += `${line.var_value2.name.value}`;
            }
        }

            js += `(${line.var_value1.value} ${line.var_operation.value} ${line.var_value2.value})`;
        }
        else {
            console.log("Error: please enter both values of operation")
            return;
        }
    }
    return js;
}

main().catch(err => console.log(err.stack));
