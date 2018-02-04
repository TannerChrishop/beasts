// Beasts 3 - librarySystem with dependencies

(function () {

    var libraryStorage = {};
    
    var dependencyStorage = [];
    
    function librarySystem(libraryName, dependency, callback) {
        if (arguments.length > 2 && Array.isArray(dependency)) {
            dependency.forEach(function (item) {
                dependencyStorage.push(libraryStorage[item]);
            });
            libraryStorage[libraryName] = callback.apply(this, dependencyStorage);
            
        } else if (arguments.length < 2) {
            dependencyStorage = [];
            return libraryStorage[libraryName];
        }
    }
    window.librarySystem = librarySystem;
    
}());


//Test 1 - single dependency in array argument. 

librarySystem('dependency', [], function () {
    return 'loaded dependency';
});

librarySystem('app', ['dependency'], function (dependency) {
    return 'app with ' + dependency;
});

librarySystem('app'); // 'app with loaded dependency'

//Test 2 - array with multiple dependencies 

librarySystem('name', [], function () {
    return 'Gordon';
});

librarySystem('company', [], function () {
    return 'Watch and Code';
});

librarySystem('workBlurb', ['name', 'company'], function (name, company) {
    return name + ' works at ' + company;
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
