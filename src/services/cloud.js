var Parse = require('parse');
Parse.initialize("alba");
Parse.serverURL = 'https://parse.cheeger.com/myapp';
// needed for parse/node Parse.User.enableUnsafeCurrentUser();

var moment = require('moment');

function todayRegistered(user) {
  var start = moment().startOf('day').utc().toDate();
  var end = moment().endOf('day').utc().toDate();
  var query = new Parse.Query(Parse.Object.extend("Register"));
  query.greaterThanOrEqualTo('createdAt', start);
  query.lessThanOrEqualTo('createdAt', end);
  query.equalTo('user', user);
  return query.count();
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

  register: function(user){
    return new Promise((resolve, reject) => {
      todayRegistered(user).then(count => {
        console.log(count);
        if(count > 0)
          resolve({exists: count});
        else {
          var Register = Parse.Object.extend("Register");
          var register = new Register();
          register.set('user', user);
          register.save(null, {
            success: object => {
              console.log('[cloud] register: ', object)
              resolve(object);
            },
            error: (err, obj) => reject(err)
          });
        }
      })
    });
  },
};
