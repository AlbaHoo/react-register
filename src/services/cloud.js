var Parse = require('parse');
Parse.initialize("alba");
Parse.serverURL = 'https://parse.cheeger.com/myapp';
// needed for parse/node Parse.User.enableUnsafeCurrentUser();

var moment = require('moment');

function parseQuery(table){
  return new Parse.Query(Parse.Object.extend(table));
}

function parseObject(table){
  var ParseTable = Parse.Object.extend(table);
  return new ParseTable();
}

function todayRegistered(user) {
  var start = moment().startOf('day').utc().toDate();
  var end = moment().endOf('day').utc().toDate();
  var query = parseQuery('Register');
  query.greaterThanOrEqualTo('createdAt', start);
  query.lessThanOrEqualTo('createdAt', end);
  query.equalTo('user', user);
  return query.count();
}

function generalCreate(table, json) {
  return new Promise((resolve, reject) => {
    var pt = parseObject(table);
    Object.keys(json).forEach((k)=> {
      pt.set(k, json[k]);
    });
    pt.save(null, {
      success: object => {
        console.log('[cloud] create: ', object)
        resolve(object);
      },
      error: (err, obj) => reject(err)
    });
  });
}

module.exports = {
  parse: Parse,
  login: function(user, pass){
    return new Promise((resolve, reject) => {
      Parse.User.logIn(user, pass, {
        success: user => resolve(user),
        error: (user, error) => reject(error)
      });
    });
  },

  currentUser: function(){
    return Parse.User.current();
  },

  logout: function(){
    return new Promise((resolve, reject) => {
      Parse.User.logOut().then(()=> resolve('done'));
    });
  },

  isRegistered: function(user){
    return new Promise((resolve, reject) => {
      todayRegistered(user).then(count => resolve(count > 0));
    });
  },

  register: function(user){
    return new Promise((resolve, reject) => {
      var register = parseObject("Register");
      register.set('user', user);
      register.save(null, {
        success: object => {
          console.log('[cloud] register: ', object)
          resolve(object);
        },
        error: (err, obj) => reject(err)
      });
    });
  },

  uploadFile(name, file){
    var user = Parse.User.current();
    if(user){
      var parseFile = new Parse.File(file.name, file);
      return generalCreate('Files', {name: name, file: parseFile, user: user});
    }
    else
      return Promise.reject('Not login');
  },

  getFileList() {
    var user = Parse.User.current();
    if(user){
      var query = parseQuery("Files");
      query.equalTo('user', user);
      return query.find();
    }
    else
      return Promise.reject('Not login');
  },

  destroyObject(table, id) {
    var obj = new Parse.Object(table);
    obj.id = id;
    return obj.destroy();
  }
};
