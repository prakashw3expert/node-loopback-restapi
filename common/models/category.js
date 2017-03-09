'use strict';

module.exports = function(Category) {
  // Patch Category
  Category.disableRemoteMethodByName("patchOrCreate");
  //Patch Category/:id
  Category.disableRemoteMethodByName("prototype.patchAttributes");
  // Post Category/replaceOrCreate
  Category.disableRemoteMethodByName("replaceOrCreate");
  ///Article/:id/replace
  Category.disableRemoteMethodByName("replaceById");
  Category.disableRemoteMethodByName("updateAttributes");
  //	/Category/change-stream
  Category.disableRemoteMethodByName('createChangeStream');
  Category.disableRemoteMethodByName("upsertWithWhere");
  Category.disableRemoteMethodByName("exists");
};
