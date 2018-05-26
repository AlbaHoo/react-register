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
    return Parse.User.logIn(user, pass);
  },

  currentUser: function(){
    return Parse.User.current();
  },

  logout: function(){
    return Parse.User.logOut();
  },

  isRegistered: function(user){
    return todayRegistered(user);
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
  },

  uploadEntry(isCredit, number, note, formattedDate){
    var user = Parse.User.current();
    var issuedAt = moment(formattedDate).toDate();
    if(user){
      return generalCreate('Entries', {isCredit, number, note, issuedAt, user});
    }
  },
  getFileList() {
    var user = Parse.User.current();
    if(user){
      var query = parseQuery("Files");
      query.equalTo('user', user);
      return query.find();
    }
  },

  getEntryList(orderField='issuedAt', orderType='asc') {
    var user = Parse.User.current();
    if(user){
      var query = parseQuery("Entries");
      query.equalTo('user', user);
      if(orderType === 'asc') {
        query.ascending(orderField);
      }else{
        query.descending(orderField);
      }
      return query.find();
    }
  },
  destroyObject(table, id) {
    var obj = new Parse.Object(table);
    obj.id = id;
    return obj.destroy();
  }
};
