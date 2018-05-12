var Parse = require('parse');
Parse.initialize("alba");
Parse.serverURL = 'https://parse.cheeger.com/myapp';

module.exports = {
  parse: Parse,
  login(user, pass){
    return new Promise((resolve, reject) => {
      Parse.User.logIn(user, pass, {
        success: user => resolve(user),
        error: (user, error) => reject(error)
      });
    });
  }
};
