'use strict';

module.exports = function(Article) {
  // Patch Article
  Article.disableRemoteMethodByName("patchOrCreate");
  //Patch Article/:id
  Article.disableRemoteMethodByName("prototype.patchAttributes");
  // Post Article/replaceOrCreate
  Article.disableRemoteMethodByName("replaceOrCreate");
  ///Article/:id/replace
  Article.disableRemoteMethodByName("replaceById");
  Article.disableRemoteMethodByName("updateAttributes");
  //	/Article/change-stream
  Article.disableRemoteMethodByName('createChangeStream');
  Article.disableRemoteMethodByName("upsertWithWhere");
  Article.disableRemoteMethodByName("exists");

  Article.listArticles = function(cb) {
   Article.find({}, cb);
  };

  Article.remoteMethod('listArticles', {
  returns:  {arg: 'myArg', type:  {
    "id": "string",
    "title": "string",
    "type": "string",
    "video": "string",
    "description": "string",
    "status": 'string',
    "created": "date",
    "modified": "date"
  }, root : true},

    description: "Get List of all articles",
    http: {path:'/list-articles', verb: 'get'},
  });

};
