'use strict';

module.exports = function(Model) {

console.log(Model);

  Model.once('attached', function(obj){
    console.log(obj);

  });

};
