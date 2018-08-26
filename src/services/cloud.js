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

function getList(model, orderField, orderType) {
  var user = Parse.User.current();
  if(user){
    var query = parseQuery(model);
    query.equalTo('user', user);
    if(orderType === 'asc') {
      query.ascending(orderField);
    }else{
      query.descending(orderField);
    }
    return query.find();
  }
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

  uploadFile(name, file){
    var user = Parse.User.current();
    if(user){
      // remove not word and not . in file name to avoid parseerror of filename
      var parseFile = new Parse.File(file.name.replace(/[^\w|^\.]/g, ''), file);
      return generalCreate('Files', {name: name, file: parseFile, user: user});
    }
  },

  getFileList() {
    var user = Parse.User.current();
    if (user) {
      var query = parseQuery("Files");
      query.equalTo('user', user);
      return query.find();
    }
  },

  getEntryList(orderField='issuedAt', orderType='asc') {
    return getList("Entries", orderField, orderType)
  },

  uploadEntry(isCredit, number, note, formattedDate){
    var user = Parse.User.current();
    var issuedAt = moment(formattedDate).toDate();
    if(user){
      return generalCreate('Entries', {isCredit, number, note, issuedAt, user});
    }
  },

  getBookList(orderField='name', orderType='asc') {
    return getList("Books", orderField, orderType)
  },

  uploadBook(name, description) {
    var user = Parse.User.current();
    if (user) {
      return generalCreate('Books', {name, description, user});
    }
  },

  destroyObject(table, id) {
    var obj = new Parse.Object(table);
    obj.id = id;
    return obj.destroy();
  }
};
