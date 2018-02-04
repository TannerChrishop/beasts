/* 
            !*!*! Beast # 1 - Improving runWithDebugger() !*!*! 
                        
    Function which takes a callback function and runs it through the debugger.
    Original version did not accept parameters to the callback. Source: https://watchandcode.com/courses/60264/lectures/1122689
    This version accepts an optional second argument in the form of an array and applies each index as a parameter to the callback. 
*/

var runWithDebuggerPlus = function (callback, callbackArray) {
    debugger;
    
    // if there are 2 arguments passed in and the second one is an array
    if (arguments.length === 2 && Array.isArray(callbackArray)) {
        
        // passing in 'null' instead of 'this' also works. It's just a placeholder in this context. 
        return callback.apply(this, callbackArray);
    } else {
        
        // if there is only one argument or the second argument is not an array, just run the callback
        return callback();
    }
};

// example 1: no arguments to callback
function sayHello() {return 'Hello'; }

runWithDebuggerPlus(sayHello);

// example 2: single item in array
function sayMyName(name) { return name; }

runWithDebuggerPlus(sayMyName, ['Heisenberg']);

// example 3: array w/ multiple items
function sayHiToFamily(father, mother, son, daughter, cousin, uncle, butler, pet) {
    return 'Hello, ' + father + ', ' + mother + ', ' + son + ', ' + daughter + ', ' +
        cousin  + ', ' + uncle + ', ' + butler + ', ' + pet;
}

runWithDebuggerPlus(sayHiToFamily, ['Gomez', 'Morticia', 'Pugsley', 'Wednesday', 'It',
                             'Fester', 'Lurch', 'Thing']);
