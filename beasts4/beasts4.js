                        // Beasts 4 - Creating libraries out of order
(function () {
    'use strict';
    
// if library has no dependencies, store return value here and return later
    var libStorage = {};
    
// if library has dependencies, store information a different object without calling the callback 
    var depStorage = {};
        
    function librarySystem(libName, dependencies, callback) {
        
        if (arguments.length === 3) {
                
            if (dependencies.length) {
                depStorage[libName] = {dependencies: dependencies,
                                      callback: callback};
            } else {
                libStorage[libName] = callback();
            }
            
        } else if (arguments.length === 1) {
            var returnValue;
            
// this condition will be true if there are no dependencies in the library 
            if (libStorage[libName]) {
                return libStorage[libName];
                
            } else if (depStorage[libName]) {
//  stores the return values for dependencies
                var arrayToApply = [];
                var storedLibrary = depStorage[libName];
/* if the dependency return value has been provided it should be stored in libStorage
they should have all been provided by this point as the last step takes only one callback */
                
                
                storedLibrary.dependencies.forEach(function (dependency) {
                    if (libStorage[dependency]) {
                        arrayToApply.push(libStorage[dependency]);
                    }
                });
// store the return value in a local variable so we can clear out the 2 global variables related to dependency
                
                returnValue = storedLibrary.callback.apply(null, arrayToApply);
                return returnValue;
                
            } else {
                throw new Error('library does not exist');
            }
            
        } else {
            throw new Error('invalid argument length');
        }
    }
    window.librarySystem = librarySystem;
}());
