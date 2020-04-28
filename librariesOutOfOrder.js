**redid watch&code beasts exercise creating libraries out of order and I liked this code better than my previous attempt.

(function (root, undefined) {

  var libStorage = {}, depStorage = {};

  function librarySystem(libName, dependencies, callback) {

    if (arguments.length > 1) {

      libStorage[libName] = callback;

      if (dependencies.length > 0) depStorage[libName] = dependencies;

    } else {
      
      if (depStorage[libName]) {

        depStorage[libName].forEach(function (item, i) {

          if (libStorage[item]) depStorage[libName][i] = libStorage[item]();
        });
      }
      return libStorage[libName].apply(this, depStorage[libName]);
    }
  }
  root.librarySystem = librarySystem;

})(window);
