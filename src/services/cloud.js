var Parse = require('parse');
Parse.initialize("alba");
Parse.serverURL = 'https://parse.cheeger.com/myapp';
// needed for parse/node Parse.User.enableUnsafeCurrentUser();

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
  }
};
