'use strict';
var path = require('path');

module.exports = function(User) {

  //User.disableRemoteMethodByName('create');
  User.disableRemoteMethodByName('upsert');
  User.disableRemoteMethodByName('updateAll');
  User.disableRemoteMethodByName('prototype.updateAttributes');

  User.disableRemoteMethodByName('find');
  //User.disableRemoteMethodByName('findById');
  User.disableRemoteMethodByName('findOne');

  User.disableRemoteMethodByName('deleteById');

  //User.disableRemoteMethodByName('confirm');
  User.disableRemoteMethodByName('count');
  User.disableRemoteMethodByName('exists');
  //User.disableRemoteMethodByName('resetPassword');

  User.disableRemoteMethodByName("replaceById");
  User.disableRemoteMethodByName("updateAttributes");
  User.disableRemoteMethodByName('createChangeStream');
  User.disableRemoteMethodByName("upsertWithWhere");
  User.disableRemoteMethodByName("replaceOrCreate");

  User.disableRemoteMethodByName('prototype.__count__accessTokens');
  User.disableRemoteMethodByName('prototype.__create__accessTokens');
  User.disableRemoteMethodByName('prototype.__delete__accessTokens');
  User.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  User.disableRemoteMethodByName('prototype.__findById__accessTokens');
  //User.disableRemoteMethodByName('prototype.__get__accessTokens');
  User.disableRemoteMethodByName('prototype.__updateById__accessTokens');

//console.log(app.get('host'));
  //send verification email after registration
  User.afterRemote('create', function(context, userInstance, next) {
    var app = User.app;

    console.log('> user.afterRemote triggered');
    var verifyUrl = 'http://' + app.get('host') + ':' + app.get('port') + '/api/v1/users/confirm?uid=' + userInstance.id + '&redirect='+app.get('verifiedRedirect')+'?ui='+ userInstance.id;

    var options = {
      type: 'email',
      to: userInstance.email,
      from: app.get('appTtitle')+' <'+app.get('noReplyEmail')+'>',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/EmailTemplate/verify.ejs'),
      publicUrl: app.get('publicUrl'),
      redirect: app.get('verifiedRedirect'),
      user: User,
      text: 'Please activate your account by clicking on this link or copying and pasting it in a new browser window:\n\t{href}',
      verifyHref : verifyUrl

    };

    userInstance.verify(options, function(err, response, next) {
      if (err) return next(err);
      console.log('> verification email sent:');
    });

    next(null, userInstance);

  });

  User.clients = function(keyword, cb) {
    var conditions = {'status' : 1,'type' : 'client'};
    if(keyword){
      conditions = {'status' : 1,'type' : 'client', 'name' : {like: keyword}};
    }
   User.find({
     where: conditions,
      limit: 3,
      fields : {'id' : true, 'name' : true, 'location' : true,'image' : true, 'online' : true,'lat' :true, 'lng' : true}
    }, function(error, users){
        var usersList = [];
        users.forEach(function(user, index){
          user.image = 'hello.png';
          users[index] = user;
        });
        cb(null, users);
    });
  };


  User.trainers = function(keyword, cb) {
    var conditions = {'status' : 1,'type' : 'trainer'};
    if(keyword){
      conditions = {'status' : 1,'type' : 'trainer', 'name' : {like: keyword}};
    }
   User.find({
     where: conditions,
      limit: 3,
      fields : {'id' : true, 'name' : true, 'location' : true,'image' : true, 'online' : true,'lat' :true, 'lng' : true}
    }, function(error, users){
        var usersList = [];
        users.forEach(function(user, index){
          user.image = 'hello.png';
          users[index] = user;
        });
        cb(null, users);
    });
  };

  User.remoteMethod('clients', {
    accepts: [
   {arg: 'keyword', type: 'string'}],
    returns: {arg: 'clients', type:  {
    "name": "string",
    "email": "string",
    "phone": 0,
    "about": "string",
    "device": "string",
    "device_id": "string",
    "realm": "string",
    "username": "string",
    "emailVerified": true,
    "id": "string"
  }, root : true},
    'description' : 'Search Clients',
    http: {path:'/search-clients', verb: 'get'},
  });

  User.remoteMethod('trainers', {
    accepts: [
   {arg: 'keyword', type: 'string'}],
    returns: {arg: 'trainers', type:  {
    "name": "string",
    "email": "string",
    "phone": 0,
    "about": "string",
    "device": "string",
    "device_id": "string",
    "realm": "string",
    "username": "string",
    "emailVerified": true,
    "id": "string"
  }, root : true},
    'description' : 'Search Trainers',
    http: {path:'/search-trainers', verb: 'get'},
  });


};
