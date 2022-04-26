# Project title.

```
● Team name: Komanda
● Project title: Fython
● Language of implementation: Java
```
# Project team members and their preliminary roles in the project.

1. **Nurbek Zhomartov**:  
    Interpreter( _Tokens, lexical/syntax analyzer, interpreter& deinterpreter_ )
3. **Dana Kabdullina**:    
    Tests + Documentation( _test of every part of the compiler,during_
       _iterations_ ) + Parser
3. **Vladislav Zharov**:   
    Type Checker()

# General description of the target programming language, its

# core ideas, and list of features.

**Fython** - static type programming language, which willhave:   
* Base types(numeric types,string,null,etc). 
* User-defined Terms and Types.  
* Standard libraries(lists - available by defaults, math - imported). 
* First-class functions.  
* Nested definitions(local vars/functions). 
* Simple Constraint-Based Type Inference. 
* Functions with multiple arguments. 
* Sequencing. 
* Records. 
* General recursion. 
* Tuples.     
* Exceptions. 

# Detailed description of the syntax, operational semantics, and

# typing rules.

**Types:**
* Integers.  
* Real numbers(doubles).  
* String.   
* Lists.  
* boolean.  


**Variables:**
* identifier : Type
* identifier : Type is **value**
* identifier = **value**

**Arimethics:**
* a + b - addition( _sum = a + b_ )
* a - b - substraction
* a * b - multiplication
* a / b - division
* a % b - mod

**Imports:**
* import **name_of_the_libarary**

**Logical Operators:**
* & - and
* | - or
* ! - not

**Comparison:**
> *  **>** - greater
> *  **<** - less
> *  **==** - equal
> *  **>=** - greater or equal
> *  **<=** - less or equal

**Comment:**
```
//any comment
```
```
/*any
lines of comments */
```

**Records:**
```
type identifier is record:
paramType : identifier
paramType : identifier
...
end record
```

**Loops:**
* **for**
```
for identifier in 0.. Int loop
   body
end loop
```
* **while**:
```
while expression loop
  body
end loop
```
**Functions:**
```
def **identifier** (Type var, Type var....) - > **outputType** {
  body
}
```
**Conditionals:**
```
if (expression) then {body} end if
```
```
if (expression) then {body} else {body} end if
```

# A link to source code of the prototype.

https://github.com/NurbakZh/Fython/

# General description of the implementation

## Instructions for building the project

Save code in the .fy extension file in the main directory and change the
“NAME_OF_FILE” variable in the _environment_ file. Afterthat you can run the
“ _main.java”._

## Instructions for using the prototype

Follow the rules from “ **_Instructions for building theproject_** ”

## Examples of valid and invalid programs.

| **Valid** | **Invalid** |
|-----------|-------------|
| ![val1](https://github.com/NurbakZh/Fython/blob/main/images/image7.png)      | ![inv1](https://github.com/NurbakZh/Fython/blob/main/images/image3.png)       |
| ![val2](https://github.com/NurbakZh/Fython/blob/main/images/image1.png)      | ![inv2](https://github.com/NurbakZh/Fython/blob/main/images/image2.png)        |
| ![val3](https://github.com/NurbakZh/Fython/blob/main/images/image9.png)      | ![inv3](https://github.com/NurbakZh/Fython/blob/main/images/image8.png)        |
| ![val4](https://github.com/NurbakZh/Fython/blob/main/images/image6.png)      | ![inv4](https://github.com/NurbakZh/Fython/blob/main/images/image4.png)        |


# Sketch of a demo program.

Zoo application:
![demo](https://github.com/NurbakZh/Fython/blob/main/images/image5.png)

